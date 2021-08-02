import {initDb,getDbClient,getSqlieFileName} from "./src/manage/initdb2.ts";
 
// get sql file from network
const response = await fetch("http://0.0.0.0:4507/manage/db.sql")
const text = await response.text() 
// get sqlite file name
const dbFileName =  getSqlieFileName()
// get sqlite cursor/client
const dbClient = getDbClient(dbFileName) 
// create tables
initDb(dbClient,text)
//copy sqlite storage file  to src 
Deno.copyFileSync(dbFileName,"./src/"+dbFileName)
Deno.removeSync(dbFileName)
const t = "tables ws created"
console.log(t)

// deno run --allow-all cli2.ts