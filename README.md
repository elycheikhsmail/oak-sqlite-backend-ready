# oak-sqlite-todo-multiple-users
in this example you will see : <br>
- how config db connexion (sqlite as example) in scalable way <br>
- retrive data from posted data <br>
- respond to user request with json data <br>
- authentificate user
- test rest api
- rest api doc based on ts instead of swagger ui
# requirement
deno cli installed
trex cli intalled (from deno.land/x modules)
# init db
you need to create table by running
```
trex run initdb 
```
init db (only one time) <br>
# how to use 
just clone this reposetory in you local machine and run this <br>
```
trex run start
```
then you can interact with this app by one the code in /doc-rest-api

 # run test on linux/mac
in terminal
```
export OAK_SQLITE_FILE=_testdb.db 
trex run start 
```
open new tab in your terminal and run
```
export OAK_SQLITE_FILE=_testdb.db  
trex run copydb
trex run test
```

 # run test on windows
in terminal
```
set OAK_SQLITE_FILE=_testdb.db 
trex run start 
```
open new tab in your terminal and run
```
set OAK_SQLITE_FILE=_testdb.db  
trex run copydb
trex run test
```

# inspiration 
this project try to port best pratic and philosophie in django/flask/foalts framework to oak in progress 

# goal
- this example is for make easy to start learning backend in deno ecosystem
- inspiration for building foalts/django-rest-framwork equivant in deno ecosystem

# why sqlite db ?

make project portable and easy to run without config
