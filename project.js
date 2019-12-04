//////////////////////////////////////////////////////////////////////////////
// Team Name: Grocery Buddy
// Last Updated: 11/26/2019
// Course: CS361 
// Assignment: CS 361 Project
// Description: This is the project's javascript file that uses Node.js and Express
///////////////////////////////////////////////////////////////////////////////

var mysql = require('./dbcon.js');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')
app.set('views',__dirname + '/views'); //Set views directory
app.use(express.static(__dirname + '/JS'));
app.set('views engine', 'ejs'); //Set view engine to ejs
app.engine('html', require('ejs').renderFile);
app.use(function(req, res, next){ //Set no cache for the server
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
})


app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))


app.set('view engine', 'List')


function getProduceForDropDown(req, res, mysql, context, complete) {
		mysql = require('./dbcon.js');
		var sql = 'SELECT GROCERY.name, GROCERY.id FROM GROCERY';
		mysql.pool.query(sql, function(error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.grocery_dropdown = results;
			complete();
		});
	}
/*
function getUsersForDropDown(req, res, context, complete) {
		var sql = 'SELECT name, id FROM GROCERY';
		mysql.pool.query(sql, function(error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.grocery_dropdown = results;
			complete();
		});
	}&/
	/*
	app.get('/', function(req, res) {
		var callbackCount = 0;
		var context = {};
	//	context.jsscripts = ["deletePlaylist.js"];
		var mysql = req.app.get('mysql');
	//	getPlaylists(req, res, mysql, context, complete);
		getUsersForDropDown(req, res, mysql, context, complete);
	//	function complete() {
		//	callbackCount++;
			//if (callbackCount >= 2) {
				res.render('List', context);
		//	}
		//}
	});
*/
app.get('/list', function (req, res) 
{
	//var name="tomato";
	//mysql.pool.query('SELECT name, price, grocerystore FROM GROCERY', function(err, results, fields)
	//var sql = , [name], 
	//mysql.pool.query('SELECT name, price, grocerystore FROM GROCERY', function(error, results, fields) 
//	{
	//		if (error) {router.get('/', function(req, res) {
		var callbackCount = 0;
		var context = {};
		//context.jsscripts = ["deletePlaylist.js"];
		var mysql = req.app.get('mysql');
//		getPlaylists(req, res, mysql, context, complete);
		getProduceForDropDown(req, res, mysql, context, complete);
		function complete() 
		{
			//callbackCount++;
		//	if (callbackCount >= 2)
			//{
				res.render('List.hbs', context);
		//	}
		}
});
//			res.write(JSON.stringify(error));
			//console.log("err");
	//		res.end();
		//	}
			//var data = [];
//		for(i=0;i<results.length;i++){
	//	data.push(results[i]);
		//}
		//res.end(JSON.stringify(results));
			//var context = {};
			//context=results.name.toString();
			//console.log(data);
//	res.render('List.hbs', data);
  
 
	//})
//	});


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/css', express.static('public/css'));

app.set("port", 3000);

function getData(res, mysql, context, complete) {
	var sql = "SELECT * FROM USERS;"
	mysql.pool.query(sql, function(err, rows, fields){
	if(err){
		res.write(JSON.stringify(err));
		res.end();
	}
	console.log(rows);
	complete();
});
}
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
	   mysql.pool.query("SELECT password FROM USERS WHERE email= ?", [username], function(err, results, fields)
	   {if (err){done(err)};
	   if (results.length==0){console.log("wrong keyword entry"); return done(null, false)};
	   if(results[0].password.toString()==password)
	   return done(null, "OK");
	   else{
	   console.log("wrong keyword entry");
	   return done(null, false);}
	  
	   
    })
	
	}));

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



app.get(['/login'], function(req, res, next){
	res.sendFile(path.join(__dirname+'/public/Login.html'));
});

app.post(['/login'], passport.authenticate(
	'local', {
	successRedirect: '/profile',
	failureRedirect: '/loginerr'
	}));

app.get(['/profile'], function(req, res, next){
	res.sendFile(path.join(__dirname+'/public/Profile.html'));
});


app.get(['/list'], function(req, res, next)
{
	
	res.render('List.handlebars');
});

app.get(['/loginerr'], function(req, res, next){
	res.sendFile(path.join(__dirname+'/public/loginerr.html'));
});

app.get(['/create'], function(req, res, next){
	res.sendFile(path.join(__dirname+'/public/create.html'));
});

app.post(['/create'], function(req, res, next){
	var sql = "INSERT INTO USERS (`email`, `password`, `name`, `address`, `familySize`, `maxDist`, `transportOpt`) VALUE (?, ?, ?, ?, ?, ?,?)"
	var inserts = [req.body.inputEmail, req.body.inputPassword, req.body.inputName, req.body.inputAddress, req.body.inputFamily,
					req.body.inputDistance, req.body.transportOpt];
	mysql.pool.query(sql, inserts, function(err, result){
	if(err){
		next(err);
		return;
	}
	res.redirect('/');
	return;
	});
})



app.listen(app.get('port'), function(){
	console.log("Express started on: " + app.get('port') + "; press Ctl-C to term");
});
