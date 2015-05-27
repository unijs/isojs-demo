var isojs = require('isojs');
var express = require('express');
var mongoose = require('mongoose');

//var routes = require('./js/Routes.js');
var blog = require('./blog/app.js');

var app = express();

// Loading Database:
var db = mongoose.connect('mongodb://localhost/isojs-demo');

var port = 1234;

app.listen(port, function() {
	console.log("STARTED SERVER! PORT: ", port);
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

app.use('/js', express.static('./client/js'));
app.use('/css', express.static('./client/css'));
app.use('/font', express.static('./client/font'));
app.use('/img', express.static('./client/img'));
app.use('/favicon.ico', express.static('./client/img/favicon.ico'));

app.use('/blog', blog());

var config = {
	routesPath: 'client/js/Routes.js',
	getApiServerAddress: function() {
		return 'http://localhost:' + port + '/';
	},
	uglify: false,
	debug: true,
	head: '<title>isoJS</title><link href="http://fonts.googleapis.com/css?family=Dosis" rel="stylesheet" type="text/css"><link rel="stylesheet" href="/css/app.css"/>'
};

var isoJSapp = isojs.appBuilder(config);

app.use(isoJSapp());