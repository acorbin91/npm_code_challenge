var jwt = require('jsonwebtoken');
var moment = require('moment');
var MySQL = require('./mysql');
var connection = global.MySQLConnection;
var wait = require('wait.for');

/* Begin User.js functions */
function User() {}


User.prototype.authenticate = function(token) {
  try {
    var decoded = jwt.verify(token, 'shhhthisshouldbeasupersecretstring');
    console.log("User token decoded - "+decoded);
  } catch(err) {
    throw ('Please authenticate with /signin?username=<user>&password=<pass> first.');
  }
  return true;
};

/* Function to add user into database */
User.prototype.add = function(data) {
  
  //input validation
  if(!data.name) return "Error - You must enter a valid name.";
  if(!data.address) return "Error -You must enter a valid address.";
  if (moment(data.birthdate, "YYYY-MM-DD", true).isValid()==false) return "Error - Invalid birthdate.";
  
  try {
    var result = wait.forMethod(connection, "q", 'INSERT INTO users SET ?', data);
  } 
  catch(err) {
    return err;
  }
  
  return "Successfully Added. ("+result.insertId+")";
};


/* Function to edit exiting user in database */
User.prototype.update = function(user_id, data) {
  
  if(!user_id) return "Error - No user_id.";
  
  //input validation
  if (!data.address && !data.name && moment(data.birthdate, "YYYY-MM-DD", true).isValid()==false) return "Error - Nothing to change / invalid date.";
  if(!user_id) return "Error - No user_id.";
  
  try {
    var result = wait.forMethod(connection, "q", 'SELECT * FROM users WHERE id = ' + connection.escape(user_id));
    if(result.length == 0) return "Error - No user with that ID.";
    else {
       wait.forMethod(connection, "q", 'UPDATE users SET ? WHERE ?', [data, { id: user_id }]);
    }
  } 
  catch(err) {
    return err;
  }
  
  return "Successfully Updated.";
};


/* Function to delete user from database */
User.prototype.del = function(user_id) {
  
  if(!user_id) return "Error - No user_id.";
  
  try {
    var result = wait.forMethod(connection, "q", 'SELECT * FROM users WHERE id = ' + connection.escape(user_id));
    if(result.length == 0) return "Error - No user with that ID.";
    else {
      connection.query('DELETE FROM users WHERE id = ' + connection.escape(user_id), function (err, result) {
        if (err) return err;
      })
    }
  }
  catch(err) {
    return err;
  }
  
  return "Successfully deleted.";
};

module.exports = User;


