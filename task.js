var jwt = require('jsonwebtoken');
var moment = require('moment');
var MySQL = require('./mysql');
var connection = global.MySQLConnection;
var wait = require('wait.for');

/* Begin User.js functions */
function Task() {}

/* Function to add user into database */
Task.prototype.add = function(data) {
  
  //input validation
  if(!data.user_id) return "Error - You must provide a valid user_id.";
  if(!data.task_list_id) return "Error - You must enter a valid task_list_id.";
  if(moment(data.completed_date, "YYYY-MM-DD", true).isValid()==false) return "Error - Invalid completed date.";
  if(data.completed != "yes" && data.completed != "no") return "Error - Completed field must be 'yes' or 'no'.";
  
  try { //first validate that task list exists
    var result = wait.forMethod(connection, "q", 'SELECT * FROM task_lists WHERE id = ' + connection.escape(data.task_list_id));
    if(result.length == 0) return "Error - No task_list with that ID.";
    else {
        try { //next validate that user exists
            var result = wait.forMethod(connection, "q", 'SELECT * FROM users WHERE id = ' + connection.escape(data.user_id));
            if(result.length == 0) return "Error - No user with that ID.";
            else { //if no fails then insert new task
               var result = wait.forMethod(connection, "q", 'INSERT INTO tasks SET ?', data);
            }
       } catch(err) {
          return err;
        }
    }
  } catch(err) {
    return err;
  }
  
  return "Successfully Added. ("+result.rows.insertId+")";
};


/* Function to edit exiting user in database */
Task.prototype.update = function(data) {
  
  //input validation
  if(data.completed != "yes" && data.completed != "no") return "Error - Completed field must be 'yes' or 'no'.";
  
  try {
    var result = wait.forMethod(connection, "q", 'SELECT * FROM tasks WHERE id = ' + connection.escape(data.id));
    if(result.length == 0) return "Error - No task with that ID.";
    else {
       wait.forMethod(connection, "q", 'UPDATE tasks SET ? WHERE ?', [data, { id: data.id }]);
    }
  } catch(err) {
    return err;
  }
  
  return "Successfully Updated.";
};


/* Function to delete task list from db */
Task.prototype.del = function(task_id) {
  
  if(!task_id) return "Error - No task_id.";
  
  try {
    var result = wait.forMethod(connection, "q", 'SELECT * FROM tasks WHERE id = ' + connection.escape(task_id));
    if(result.length == 0) return "Error - No task with that ID.";
    else {
      connection.query('DELETE FROM tasks WHERE id = ' + connection.escape(task_id), function (err, result) {
        if (err) return err;
      })
    }
  } catch(err) {
    return err;
  }
  
  return "Successfully deleted.";
};

module.exports = Task;

