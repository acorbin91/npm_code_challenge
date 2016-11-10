// tests/test.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var User = require('./user');
var TaskList = require('./task_list');
var Task = require('./task');
var wait = require('wait.for');

/* Begin Unit Testing User Functions */
var User = new User([]);

describe('Users', function() {
    
  it('authenticate() should throw the following error if a valid token is not provided.', function() {
    expect(function() { User.authenticate("invalid token") }).to.throw("Please authenticate");
  });
  
  it('add() should return "Error" as part of a string if name, address, or birthdate are invalid.', function() {
    wait.launchFiber(function() {
      var data  = {name: "", address: "", birthdate: "not a valid date"};
      var ret = User.add(data);
      expect(ret).to.have.string('Error');
    });
  });

  it('update() should return "Error" as part of a string if no user_id or a non-existent db user_id is provided.', function() {
    wait.launchFiber(function() {
      var data  = {name: "", address: "", birthdate: ""};
      var user_id = 99999999;
      var ret = User.update(user_id, data);
      expect(ret).to.have.string('Error');
    });
  });
  
  it('del() should return "Error" as part of a string if no user_id or a non-existent db user_id is provided.', function() {
    wait.launchFiber(function() {
      var user_id = "99999999";
      var ret = User.del(user_id);
      expect(ret).to.have.string('Error');
    });
  });
  
});


/* Begin Unit Testing TaskList functions */
var TaskList = new TaskList([]);

describe('TaskList', function() {
  
  it('add() should throw an error if an invalid user_id or an empty/null name value is provided.', function() {
    wait.launchFiber(function() {
      var user_id = "99999999";
      var ret = TaskList.add({user_id: 99999, name: ""});
      expect(ret).to.have.string('Error');
    });
  });
  
  it('update() should return "Error" as part of a string if a empty/null name or invalid user_id is provided.', function() {
    wait.launchFiber(function() {
      var data = {};
      data.id = 0;
      data.name = ""
  
      var ret = TaskList.update(data);
      expect(ret).to.have.string('Error');
    });
  });
  
  
  it('del() should return "Error" as part of a string if a empty/null name or invalid user_id is provided.', function() {
    wait.launchFiber(function() {
      var ret = TaskList.del(0);
      expect(ret).to.have.string('Error');
    });
  });
  
});



/* Begin Unit Testing on Task Functions */
var Task = new Task([]);

describe('Task', function() {
  
  it('add() returns an error if an invalid user_id, task_list_id is provided. An enum (yes/no) value and valid date must be provided as well.', function() {
    wait.launchFiber(function() {
      var data  = {
        user_id: 0,
        task_list_id: 0,
        completed: "not a yes or no value",
        completed_date: "not a valid date"
      };
      var ret = Task.add(data);
      expect(ret).to.have.string('Error');
    });
  });
  
  it('update() should return "Error" as part of a string if a empty/null name or invalid task_id is provided or completed is not enum(yes,no).', function() {
    wait.launchFiber(function() {
      var data = {};
      
      data.id = 0;
      data.completed = "not yes or no";

      var ret = Task.update(data);
      expect(ret).to.have.string('Error');
    });
  });
  
  
  it('del() should return "Error" as part of a string if an invalid task_id is provided.', function() {
    wait.launchFiber(function() {
      var ret = TaskList.del(0);
      expect(ret).to.have.string('Error');
    });
  });
  
});