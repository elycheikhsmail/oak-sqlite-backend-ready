const fileName = Deno.env.get("OAK_SQLITE_FILE")
const p = Deno.cwd()
await Deno.copyFile(p+"/doc-rest-api/test/db/_testdb.db",p+"/src/"+fileName)
 
console.log("db file is copied ")