//////////////////////////////////////////////////////////////////////////////
// Team Name: Grocery Buddy
// Last Updated: 11/26/2019
// Course: CS361 
// Assignment: CS 361 Project
// Description: This is the project's javascript file that uses Node.js and Express
///////////////////////////////////////////////////////////////////////////////

var mysql = require('./dbcon.js');
const express = require("express");
const app = express();
const path = require('path');

app.use(express.static('public'));

app.use('/css', express.static('public/css'));

app.set("port", 3000);

function getData(res, mysql, context, complete) {
	var sql = "SELECT * FROM USER;"
	mysql.pool.query(sql, function(err, rows, fields){
	if(err){
		res.write(JSON.stringify(err));
		res.end();
	}
	console.log(rows);
	complete();
});
}

app.get(['/', '/index'], function(req, res, next){
	res.sendFile(path.join(__dirname+'/public/login.html'));
});

app.get(['/database'], function(req, res, next){
	var callbackCount = 0;
	var context = {};
	console.log("testing");
	getData(res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			console.log(context);
		}
	}
});

app.listen(app.get('port'), function(){
	console.log("Express started on: " + app.get('port') + "; press Ctl-C to term");
});
