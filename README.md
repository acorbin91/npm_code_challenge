# NodeJS CRUD App Code Challenge

###### Or more technically, a CUD app, since there are no read functions. When you run this application it will provide REST API's for creating/updating/deleting users, task lists, and tasks from a MySQL database. The outputs will either contain the word "Success" or "Error" depending on the paramaters provided. In order to use any of the API's you must first authenticate with a hardcoded user/password. This will provide you with a token, which you must include with every API request you make.

## Demo
A running demo of this application can be found at the following locations:
http://parkitfor.me:2323/user/authenticate?username=foo&password=bar

A live phpmyadmin DB GUI for this demo can be accessed at:
http://parkitfor.me/phpmyadmin

Username: node_challenge
Password: q1UVzjF6Hmw4Rnm1

## Installation
In order to install and run this project, simply clone this git directory, setup your MySQL db and run db.sql in it, then change the configuration options in mysql.js to match your setup. Then "node app.js" in the project dir. Now open up your browser to http://[your ip]:2323/user/authenticate?username=foo&password=bar to get a token. From there you can use the endpoint descriptions below to access the API's.

## Unit Testing
You can unit test all of the user/task list/task functions by running "npm test test.js" in the project directory.
 ![alt tag](https://i.imgur.com/5EsX8bi.png)

## The following endpoints are available: 

**/user/authenticate**

Description: 
######Will provide an API token used for authentication when the right username and password are provided.

Paramaters: 
  * username
  * password
  
######E.g. http://[your ip]:2323/user/authenticate?username=foo&password=bar

---

**/user/add**

Description: 
######Takes GET paramaters and validates them before inserting into DB. All paramaters are required.

Paramaters: 
  * name
  * address
  * birthdate (YYYY-MM-DD)
  
######E.g. http://[your ip]:2323/user/add?name=Foo&address=Bar&birthdate=1991-01-06&token=[token]

---


**/user/update**

Description: 
######Takes GET paramaters and validates them before updating user record in DB.

Paramaters: 
  * user_id (required)
  * name (optional)
  * address (optional)
  * birthdate (optional) (YYYY-MM-DD)
  
######E.g. http://[your ip]:2323/user/update?user_id=1&name=Foo&address=Bar&birthdate=1991-01-06&token=[token]

---


**/user/delete**

Description: 
######Takes GET paramaters and validates them before deleting a specific user from DB.

Paramaters: 
  * user_id (required)
  
######E.g. http://[your ip]:2323/user/delete?user_id=1&token=[token]

---



**/task_list/add**

Description: 
######Takes GET paramaters and validates them before adding a task list to the DB.

Paramaters: 
  * user_id (required)
  * name (required)
  
######E.g. http://[your ip]:2323/task_list/add?user_id=1&name=FooBar&token=[token]

---



**/task_list/update**

Description: 
######Takes GET paramaters and validates them before editing a task list in the DB.

Paramaters: 
  * name (required)
  * task_list_id (required)
  
######E.g. http://[your ip]:2323/task_list/add?task_list_id=1&name=FooBar&token=[token]

---



**/task_list/delete**

Description: 
######Takes GET paramaters and validates before deleting a task list from the DB.

Paramaters: 
  * task_list_id (required)
  
######E.g. http://[your ip]:2323/task_list/delete?task_list_id=1&token=[token]

---

  
**/task/add**

Description: 
######Takes GET paramaters and validates before adding a new task in the DB.

Paramaters: 
  * user_id (required)
  * task_id (required)
  * completed_date (required) (YYYY-MM-DD)
  * completed (required) (yes-no)
  
######E.g. http://[your ip]:2323/task/add?user_id=1&task_list_id=1&completed_date=2016-11-09&completed=yes&token=[token]

---


**/task/update**

Description: 
######Takes GET paramaters and validates before editing an existing task in the DB.

Paramaters: 
  * task_id (required)
  * completed (required) (yes-no)
  
######E.g. http://[your ip]:2323/task/update?task_id=1&completed=yes&token=[token]

---


**/task/delete**

Description: 
######Takes GET paramaters and validates before deleting an existing task from the DB.

Paramaters: 
  * task_id (required)
  
######E.g. http://[your ip]:2323/task/delete?task_id=1&token=[token]

---
