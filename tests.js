// tests/test.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var User = require('./user');
var TaskList = require('./task_list');

var User = new User([]);

describe('Users', function() {
    
  it('authenticate() should return throw the following error if a valid token is not provided.', function() {
    expect(function() { User.authenticate("invalid token") }).to.throw("Please authenticate");
  });
  
  it('add() should throw an error if name, address, or birthdate are invalid.', function() {
    var data  = {name: "", address: "", birthdate: "not a valid date"};
    expect(function() { User.add(data) }).to.throw("Error -");
  });
  
  it('update() should throw an error if no name, birthdate, or address or provided.', function() {
    var data  = {name: "", address: "", birthdate: ""};
    var user_id = 1;
    expect(function() { User.update(user_id, data) }).to.throw("Error -");
  });
  
  it('update() should throw an error if no user_id or a non-existent db user_id is provided.', function() {
    var data  = {name: "", address: "", birthdate: ""};
    var user_id = 99999999;
    expect(function() { User.update(user_id, data) }).to.throw("Error -");
  });
  
  it('del() should throw an error if no user_id or a non-existent db user_id is provided.', function() {
    var user_id = 99999999;
    expect(function() { User.update(user_id) }).to.throw("Error -");
  });
  
});



var TaskList = new TaskList([]);

describe('TaskList', function() {
  it('add() should throw an error if a valid user_id and non-null name value isnt provided.', function() {
    expect(function() { TaskList.add({user_id: 99999, name: ""}) }).to.throw("Error -");
  });
});