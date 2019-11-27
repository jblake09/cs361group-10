//////////////////////////////////////////////////////////////////////////////
// Team Name: Grocery Buddy
// Last Updated: 11/26/2019
// Course: CS361 
// Assignment: CS 361 Project
// Description: This is the project's javascript file that uses Node.js and Express
///////////////////////////////////////////////////////////////////////////////

var mysql = require('./dbcon.js');
// var http = require('http');
var express = require("express");

var app = express();
app.use(express.static('public'));

app.use('/css', express.static(__dirname + 'public/css'));

var server = app.listen(3000, function(){
	var port = server.address().port;
	console.log("Server started at http://localhost:%s", port)
});

// http.createServer(function(req,res){
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello world!');
// }).listen(3000);

//console.log('Server started on localhost:3000; press Ctrl-C to terminate....');

// app.get(['/', '/index'], function(req, res, next){
// 	var callbackCount = 0;
// 	var context = {};
// 	context.title = "Login";
// 	function complete(){
// 		callbackCount++;
// 		if(callbackCount >= 0){
// 		res.render('Login.html', context);
// 	};
// 	}
// });