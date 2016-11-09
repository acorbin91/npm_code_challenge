var jwt = require('jsonwebtoken');
var moment = require('moment');
var connection = global.MySQLConnection;
var wait = require('wait.for');

/* Begin User.js functions */
function Task() {}

/* Function to add user into database */
Task.prototype.add = function(data) {
  
  //input validation
  if(!data.user_id) throw "Error - You must provide a valid user_id.";
  if(!data.task_list_id) throw "Error - You must enter a valid task_list_id.";
  if(moment(data.completed_date, "YYYY-MM-DD", true).isValid()==false) throw "Error - Invalid completed date.";
  if(data.completed != "yes" && data.completed != "no") throw "Error - Completed field must be 'yes' or 'no'.";
  
  try { //first validate that task list exists
    var result = wait.forMethod(connection, "q", 'SELECT * FROM task_lists WHERE id = ' + connection.escape(data.task_list_id));
    if(result.length == 0) throw "Error - No task_list with that ID.";
    else {
        try { //next validate that user exists
            var result = wait.forMethod(connection, "q", 'SELECT * FROM users WHERE id = ' + connection.escape(data.user_id));
            if(result.length == 0) throw "Error - No user with that ID.";
            else { //if no fails then insert new task
               wait.forMethod(connection, "q", 'INSERT INTO task SET ?', data);
            }
       }
    }
  } 
  catch(err) {
    return err;
  }

  return "Successfully Added.";
};


/* Function to edit exiting user in database */
Task.prototype.update = function(data) {
  
  //input validation
  if(data.completed != "yes" && data.completed != "no") throw "Error - Completed field must be 'yes' or 'no'.";
  
  try {
    var result = wait.forMethod(connection, "q", 'SELECT * FROM tasks WHERE id = ' + connection.escape(data.task_id));
    if(result.length == 0) throw "Error - No task with that ID.";
    else {
       wait.forMethod(connection, "q", 'UPDATE tasks SET ? WHERE ?', [data, { id: data.task_id }]);
    }
  } 
  catch(err) {
    return err;
  }
  
  return "Successfully Updated.";
};


/* Function to delete task list from db */
Task.prototype.del = function(task_id) {
  
  if(!task_id) throw "Error - No task_id.";
  
  try {
    var result = wait.forMethod(connection, "q", 'SELECT * FROM tasks WHERE id = ' + connection.escape(task_id));
    if(result.length == 0) throw "Error - No task with that ID.";
    else {
      connection.query('DELETE FROM tasks WHERE id = ' + connection.escape(task_id), function (err, result) {
        if (err) throw err;
      })
    }
  }
  catch(err) {
    return err;
  }
  
  return "Successfully deleted.";
};

module.exports = Task;


