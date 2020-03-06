var request = require('request');
var Config = require('../../config');
var ejs = require('ejs');

var emailer = {};
var fromName = Config.siteName;
var sender = Config.elasticEmail.sender;
var headers = {
	"Content-Type": "application/x-www-form-urlencoded"
}
var url = Config.elasticEmail.url;
var method = "POST";

emailer.SendSignupConfirmEmail = function(user){
	if(!Config.elasticEmail.enable) return;

	ejs.renderFile('view/email/signupConfirm.ejs', {
		user: user,
		hostname: Config.hostname,
		siteName: Config.siteName
	}, {}, function(err, html){
		if(err) console.log(err);
		var options = {
			url: url,
			method: method,
			headers: headers,
			form: {
				"apikey": Config.elasticEmail.apiKey,
				"from": sender,
				"fromName": fromName,
				"to": user.signupEmail,
				"subject": Config.siteName+" 註冊確認信",
				"bodyHtml":html,
				"isTransactional ": true
			}
		}

		request(options, function (error, response, body) {
			if(error) console.log(error);
			if (!error && response.statusCode == 200) {
				//console.log(body)
			}
		})
	});
	
};

emailer.SendResetPasswordEmail = function(user,token){
	if(!Config.elasticEmail.enable) return;
	
	var resetUrl = Config.hostname+"/login?reset=1&token="+token;
	ejs.renderFile('view/email/resetPassword.ejs', {
		user: user, 
		resetUrl: resetUrl,
		siteName: Config.siteName
	}, {}, function(err, html){
		if(err) console.log(err);
		var options = {
			url: url,
			method: method,
			headers: headers,
			form: {
				"apikey": Config.elasticEmail.apiKey,
				"from": sender,
				"fromName": fromName,
				"to": user.signupEmail,
				"subject": Config.siteName+" 密碼重設",
				"bodyHtml":html,
				"isTransactional ": true
			}
		}

		request(options, function (error, response, body) {
			if(error) console.log(error);
			if (!error && response.statusCode == 200) {
				//console.log(body)
			}
		})
	});
};

module.exports = emailer;