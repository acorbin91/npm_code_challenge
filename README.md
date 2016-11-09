# NodeJS CRUD App Code Challenge

###### When run this application will provide REST API's for creating/updating/deleting users, task lists, and tasks from a MySQL database. The outputs will either contain the word "Success" or "Error" depending on the paramaters provided. In order to use any of the API's you must first authenticate with a hardcoded user/password. This will provide you with a token, which you must include with every API request you make.

## The following endpoints are available:

**http://127.0.0.1/user/token**

Description: 
######Will provide an API token used for authentication when the right username and password are provided.

Paramaters: 
  * username
  * password
  
######E.g. http://127.0.0.1/user/token?username=foo&password=bar

---

**http://127.0.0.1/user/add**

Description: 
######Takes GET paramaters and validates them before inserting into DB. All paramaters are required.

Paramaters: 
  * name
  * address
  * birthdate (YYYY-MM-DD)
  
######E.g. http://127.0.0.1/user/add?name=Foo&address=Bar&birthdate=1991-01-06&token=[token]

---


**http://127.0.0.1/user/update**

Description: 
######Takes GET paramaters and validates them before updating user record in DB.

Paramaters: 
  * user_id (required)
  * name (optional)
  * address (optional)
  * birthdate (optional) (YYYY-MM-DD)
  
######E.g. http://127.0.0.1/user/update?user_id=1&name=Foo&address=Bar&birthdate=1991-01-06&token=[token]

---


**http://127.0.0.1/user/delete**

Description: 
######Takes GET paramaters and validates them before deleting a specific user from DB.

Paramaters: 
  * user_id (required)
  
######E.g. http://127.0.0.1/user/delete?user_id=1&token=[token]

---



**http://127.0.0.1/task_list/add**

Description: 
######Takes GET paramaters and validates them before adding a task list to the DB.

Paramaters: 
  * user_id (required)
  * name (required)
  
######E.g. http://127.0.0.1/task_list/add?user_id=1&name=FooBar&token=[token]

---



**http://127.0.0.1/task_list/update**

Description: 
######Takes GET paramaters and validates them before editing a task list in the DB.

Paramaters: 
  * name (required)
  * task_list_id (required)
  
######E.g. http://127.0.0.1/task_list/add?task_list_id=1&name=FooBar&token=[token]

---



**http://127.0.0.1/task_list/delete**

Description: 
######Takes GET paramaters and validates before deleting a task list from the DB.

Paramaters: 
  * task_list_id (required)
  
######E.g. http://127.0.0.1/task_list/delete?task_list_id=1&token=[token]

---

  
**http://127.0.0.1/task/add**

Description: 
######Takes GET paramaters and validates before adding a new task in the DB.

Paramaters: 
  * user_id (required)
  * task_id (required)
  * completed_date (required) (YYYY-MM-DD)
  * completed (required) (yes-no)
  
######E.g. http://127.0.0.1/task/add?user_id=1&task_id=1&completed_date=2016-11-09&completed=yes&token=[token]

---


**http://127.0.0.1/task/update**

Description: 
######Takes GET paramaters and validates before editing an existing task in the DB.

Paramaters: 
  * task_id (required)
  * completed (required) (yes-no)
  
######E.g. http://127.0.0.1/task/add?user_id=1&task_id=1&completed=yes&token=[token]

---


**http://127.0.0.1/task/delete**

Description: 
######Takes GET paramaters and validates before deleting an existing task from the DB.

Paramaters: 
  * task_id (required)
  
######E.g. http://127.0.0.1/task/delete?task_id=1&token=[token]

---
