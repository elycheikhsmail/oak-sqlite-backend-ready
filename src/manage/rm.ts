//import * as path from "http://deno.land/x/std/path/mod.ts";
Deno.chdir(Deno.cwd()+"/src"); 
let fileName = "_testdb.db";
const n = Deno.env.get( "OAK_SQLITE_FILE");
if (n) fileName = n;
// deleting  sqlite-test-file if exis
//const p = path.
 Deno.remove(fileName)
 console.log("file "+fileName+" is removed ")