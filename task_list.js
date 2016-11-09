var jwt = require('jsonwebtoken');
var moment = require('moment');
var connection = global.MySQLConnection;
var wait = require('wait.for');

/* Begin User.js functions */
function TaskList() {}

/* Function to add user into database */
TaskList.prototype.add = function(data) {
  
  //input validation
  if(!data.user_id) throw "Error - You must provide a valid user_id.";
  if(!data.name) throw "Error - You must enter a valid task list name.";
  
  try {
    var result = wait.forMethod(connection, "q", 'SELECT * FROM users WHERE id = ' + connection.escape(data.user_id));
    if(result.length == 0) throw "Error - No user with that ID.";
    else {
       wait.forMethod(connection, "q", 'INSERT INTO task_lists SET ?', data);
    }
  } 
  catch(err) {
    return err;
  }

  return "Successfully Added.";
};


/* Function to edit exiting user in database */
TaskList.prototype.update = function(data) {
  
  //input validation
  if (!data.name) throw "Error - Invalid name.";
  if(!data.task_list_id) throw "Error - No task_list_id.";
  
  try {
    var result = wait.forMethod(connection, "q", 'SELECT * FROM task_lists WHERE id = ' + connection.escape(data.task_list_id));
    if(result.length == 0) throw "Error - No task_list with that ID.";
    else {
       wait.forMethod(connection, "q", 'UPDATE task_lists SET ? WHERE ?', [data, { id: data.task_list_id }]);
    }
  } 
  catch(err) {
    return err;
  }
  
  return "Successfully Updated.";
};


/* Function to delete task list from db */
TaskList.prototype.del = function(task_list_id) {
  
  if(!task_list_id) throw "Error - No task_list_id.";
  
  try {
    var result = wait.forMethod(connection, "q", 'SELECT * FROM task_lists WHERE id = ' + connection.escape(task_list_id));
    if(result.length == 0) throw "Error - No task_list with that ID.";
    else {
      connection.query('DELETE FROM task_lists WHERE id = ' + connection.escape(task_list_id), function (err, result) {
        if (err) throw err;
      })
    }
  }
  catch(err) {
    return err;
  }
  
  return "Successfully deleted.";
};

module.exports = TaskList;


