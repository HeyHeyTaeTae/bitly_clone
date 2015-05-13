var express = require("express");
var path = require("path"); 
var bodyParser = require("body-parser");
var randomString = require("randomstring");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

// a variable that represents "./views"
var views = path.join(process.cwd(), "views"); 

var urls = {};

app.get("/", function (req, res) {
    var homePath = path.join(views, "home.html");
    res.sendFile(homePath);
});

app.post("/urls", function (req, res) {
    var newUrl = req.body.url;
    var index = randomString.generate();
    urls[index] = newUrl;
    res.send("View your url at localhost:3000/urls/" + index);
});

app.get("/urls/:index", function (req, res) {
	console.log(urls);
    var url = urls[req.params.index];
    res.redirect(url);
});

app.listen(3000, function (req, res) {
    console.log("working!!");
});