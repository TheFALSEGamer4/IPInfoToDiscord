$(document).ready(function () {
	$.getJSON("http://jsonip.com/?callback=?", function (data) {
		console.log("Your IP Is: " + data.ip);
		postDataToWebhook(data.ip);
	});
});
function postDataToWebhook(data) {
	//get the values needed from the passed in json object
	var ip = data;
	var storedip = localStorage.getItem("UserIP")

	//url to your webhook
	var webHookUrl = "PutYourDiscordWebhookURLHere";


	//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
	var oReq = new XMLHttpRequest();
	var myJSONStr = { "content": "New User IP Address: " + ip, "username": "NameForBotInChannelGoesHere", "avatar_url": "LinkToAvatarPictureGoesHere" };

	
	//simple searching algorithm to see if user has been on the site before, does work for a different device on the same network or if user is in incognito. 
	if (ip == storedip) {
		console.log("Same User")
	} else {
		//register method called after data has been sent method is executed
		oReq.addEventListener("load", reqListener);
		oReq.open("POST", webHookUrl, true);
		oReq.setRequestHeader('Content-Type', 'application/json');
		oReq.send(JSON.stringify(myJSONStr));
		localStorage.setItem("UserIP",ip);
	}
	

}
//callback method after webhook is executed
function reqListener() {
	console.log(this.responseText);
}
