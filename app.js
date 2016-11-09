/* Dependencies */
var http = require('http');
var express = require("express");
var app = express();
var jwt = require('jsonwebtoken');
var wait = require("wait.for");

/* MySQL Config */
var mysql      = require('mysql');
global.MySQLConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'node_challenge',
  password : 'q1UVzjF6Hmw4Rnm1',
  database : 'node_challenge'
});
global.MySQLConnection.q = function(sql, params, stdCallback){ 
            this.query(sql,params, function(err,rows,columns){ 
                                return stdCallback(err,{rows:rows,columns:columns}); 
                        });
}
global.MySQLConnection.connect();


/* Initiate User Functions */
var User = require('./user');
var User = new User([]);


/* Begin Routes */

//Add user
app.get("/user/add", function(req, res) {
  User.authenticate(req.query.token);

  var data  = {name: req.query.name, address: req.query.address, birthdate: req.query.birthdate};
  wait.launchFiber(function() {
    result = User.add(data);
    res.send(result);
    res.end();
  });
  
});

//Update user
app.get("/user/update", function(req, res) {
  User.authenticate(req.query.token);
  var data = {};
  
  var user_id = req.query.user_id;
  if(req.query.name) data.name = req.query.name;
  if(req.query.address) data.address = req.query.address;
  if(req.query.birthdate) data.birthdate = req.query.birthdate;

  wait.launchFiber(function() {
    result = User.update(user_id, data);
    res.send(result);
    res.end();
  });
  
});

//Delete user
app.get("/user/delete", function(req, res) {
  User.authenticate(req.query.token);
  
  var user_id = req.query.user_id;
  wait.launchFiber(function() {
    result = User.del(user_id);
    res.send(result);
    res.end();
  });
  
});

//Authentication Token
app.get("/signin", function(req, res) {
  
  var username = req.query.username;
  var password = req.query.password;

  if(username != "foo" || password != "bar") {
    res.send("Error, invalid user / password.");
    res.end();
  }
  var token = jwt.sign({ foo: 'bar' }, 'shhhthisshouldbeasupersecretstring');
  
	res.send(token);
	res.end();
});



/* Begin Routes for Task Lists */

//Add task list
app.get("/task_list/add", function(req, res) {
  User.authenticate(req.query.token);
  
  var TaskList = require('./task_list');
  var TaskList = new TaskList([]);
    
  var data  = {name: req.query.name, user_id: req.query.user_id};
  wait.launchFiber(function() {
    result = TaskList.add(data);
    res.send(result);
    res.end();
  });
  
});

//Update task list
app.get("/task_list/update", function(req, res) {
  User.authenticate(req.query.token);
  
  var TaskList = require('./task_list');
  var TaskList = new TaskList([]);
  
  var data = {};
  data.task_list_id = req.query.task_list_id;
  data.name = req.query.name;

  wait.launchFiber(function() {
    result = TaskList.update(data);
    res.send(result);
    res.end();
  });
  
});

//Delete task list
app.get("/task_list/delete", function(req, res) {
  User.authenticate(req.query.token);
  
  var TaskList = require('./task_list');
  var TaskList = new TaskList([]);
  
  var task_list_id = req.query.task_list_id;
  wait.launchFiber(function() {
    result = TaskList.del(task_list_id);
    res.send(result);
    res.end();
  });
  
});



/* Begin Routes for Tasks */

//Add task
app.get("/task/add", function(req, res) {
  User.authenticate(req.query.token);
  
  var Task = require('./task');
  var Task = new Task([]);
    
  var data  = {user_id: req.query.user_id, task_list_id: req.query.task_list_id, completed: req.query.completed, completed_date: req.query.completed_date};
  wait.launchFiber(function() {
    result = Task.add(data);
    res.send(result);
    res.end();
  });
  
});

//Update task 
app.get("/task/update", function(req, res) {
  User.authenticate(req.query.token);
  
  var Task = require('./task');
  var Task = new Task([]);
  
  var data = {};
  
  data.task_id = req.query.task_id;
  data.completed = req.query.completed;

  wait.launchFiber(function() {
    result = Task.update(data);
    res.send(result);
    res.end();
  });
  
});

//Delete task
app.get("/task/delete", function(req, res) {
  User.authenticate(req.query.token);
  
  var Task = require('./task');
  var Task = new Task([]);
  
  var task_id = req.query.task_id;
  wait.launchFiber(function() {
    result = TaskList.del(task_id);
    res.send(result);
    res.end();
  });
  
});


app.listen(1337);
console.log('Server running at http://127.0.0.1:1337/');

