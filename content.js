var body = document.getElementsByTagName("body")[0];
var message = document.createElement("div");
message.innerHTML = "You have already accessed this website today.";
body.insertBefore(message, body.firstChild);
