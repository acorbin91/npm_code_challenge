/* MySQL Config */
var mysql      = require('mysql');
global.MySQLConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'node_challenge',
  password : 'q1UVzjF6Hmw4Rnm1',
  database : 'node_challenge'
});
/* Custom MySQL callback function for synchronous capability through wait.for */
global.MySQLConnection.q = function(sql, params, stdCallback){ 
  this.query(sql,params, function(err,rows,columns){ 
    return stdCallback(err,{rows:rows,columns:columns}); 
  });
}
global.MySQLConnection.connect();
