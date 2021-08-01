import {initDb,getDbClient,getSqlPath,getSqlieFileName} from "./src/manage/initdb.ts";
 
const dbFileName =  getSqlieFileName()
const dbClient = getDbClient(dbFileName) 

const p = getSqlPath() 
initDb(dbClient,p) 
Deno.copyFileSync(dbFileName,"./src/"+dbFileName)
Deno.removeSync(dbFileName)
const t = "tables ws created"
console.log(t)
