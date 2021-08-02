 
- [x] public/private ressource
convention objectName/public
- [x] j'ai standarise la structure des oak-app
-[x] eache mod must export needed object from mod.ts or types

-[x] test for add item 
-[x]  test get all objects
-[x]  test get all objects by name
-[x]  get object by name and id
-[x] filter et pagination est laisser cote client pour simplifier le backen

 
- get by id
- delete object
- update object
- store file
- convention 
     /api/objects/add/file
     for linking file to a specific object


- organisation du code
deplacer le code middlware de server/midd to middlw folder

- eboutique version



- logger for dev
 
- web ui + oak backend+worker
read run.json
expose script in ui like this
alias xx
command yyy
button for running this command 
in background oak hettp server recive command alias
and tel worker to do the job and give feedback to oak 
then ok give feedback to browser using ws



next eboutique ui ready for prod
next eboutique backend ready for prod
deploy