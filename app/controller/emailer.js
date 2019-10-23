var request = require('request');
var Config = require('../../config');
var ejs = require('ejs');

var emailer = {};
var fromName = Config.siteName;
var sender = "service@agawork.tw";
var headers = {
	"Content-Type": "application/x-www-form-urlencoded"
}
var url = "https://api.elasticemail.com/v2/email/send";
var method = "POST";

emailer.SendCreateNotifyEmail = function(user){
	ejs.renderFile('view/email/createNotify.ejs', {user: user, hostname: Config.hostname, siteName: Config.siteName}, {}, function(err, html){
		var options = {
			url: url,
			method: method,
			headers: headers,
			form: {
				"apikey": Config.elasticEmail.apiKey,
				"from": sender,
				"fromName": fromName,
				"to": user.email,
				"subject": Config.siteName+"帳號啟用確認信",
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
	var resetUrl = Config.hostname+"/auth/login?reset=1&token="+token;
	ejs.renderFile('view/email/resetPassword.ejs', {user: user, resetUrl: resetUrl, siteName: Config.siteName}, {}, function(err, html){
		var options = {
			url: url,
			method: method,
			headers: headers,
			form: {
				"apikey": Config.elasticEmail.apiKey,
				"from": sender,
				"fromName": fromName,
				"to": user.email,
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