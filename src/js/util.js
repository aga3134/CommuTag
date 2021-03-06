
var GetUrlParameter = function(){
	var queryStr = window.location.search.substring(1);
	var paramArr = queryStr.split('&');

	var result = {};
	for (var i=0; i<paramArr.length; i++) {
		var param = paramArr[i].split('=');
		result[param[0]] = param[1];
	}
	return result;
};

var GetUrlHash = function(){
	var queryStr = window.location.hash.substr(1);
	var paramArr = queryStr.split('&');

	var result = {};
	for (var i=0; i<paramArr.length; i++) {
		var param = paramArr[i].split('=');
		result[param[0]] = param[1];
	}
	return result;
};

var ValidateEmail = function(email){
  var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
};

var PadLeft = function(val, totalLen, ch){
	var  len = (totalLen - String(val).length)+1;
	return len > 0? new Array(len).join(ch || '0')+val : val;
}

var util = {
	GetUrlParameter: GetUrlParameter,
	GetUrlHash: GetUrlHash,
	ValidateEmail: ValidateEmail,
	PadLeft: PadLeft
}

export default util;
