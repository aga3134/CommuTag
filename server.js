var express = require("express");
var ejs = require("ejs");
var passport = require("passport");
var session = require("express-session");
var MongoDBStore = require('connect-mongodb-session')(session);
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var fs = require("fs-extra");
var path = require('path');
var morgan = require('morgan');

var Config = require("./config");

var ViewRoute = require("./app/route/viewRoute.js");
var AuthRoute = require("./app/route/authRoute.js");
var UserRoute = require("./app/route/userRoute.js");
var DatasetRoute = require("./app/route/datasetRoute.js");
var FavoriteRoute = require("./app/route/favoriteRoute.js");
var ApiRoute = require("./app/route/apiRoute.js");

mongoose.connect(Config.mongodb.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.pluralize(null);

//setup view & static file
var rootDir = __dirname;
var app = express();
app.port = Config.serverPort || 8001;
app.set('view engine', 'ejs');
app.set("views", rootDir + "/view");
app.use('/static',express.static(rootDir + '/static'));
app.use('/dist',express.static(rootDir + '/dist'));

//setup auth
var options = {
    uri: Config.mongodb.url,
    collection: 'user_session'
};
var sessionStore = new MongoDBStore(options);

var logPath = path.join(__dirname, 'log/')
if (!fs.existsSync(logPath)){
	fs.mkdirpSync(logPath);
}
var accessLogStream = fs.createWriteStream(logPath+"access.log", { flags: 'a' })
app.use(morgan("short",{ stream: accessLogStream }));

app.use(session({
    secret: Config.session.secret,
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: true,maxAge: 1000*60*60*24*100}	//session保留100天
}));

app.use(bodyParser.urlencoded({extended: true,limit: '5mb'}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


//setup route
app.use("/", ViewRoute);
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/dataset", DatasetRoute);
app.use("/favorite", FavoriteRoute);
app.use("/api", ApiRoute);


app.listen(app.port);
console.log("CommuTag started in "+Config.mode+" mode");

module.exports = app;