
import appsArray from "../config/installed-apps.ts";
import { createAllTables } from "../manage/create-all-tables.ts";
Deno.chdir(Deno.cwd()+"/src"); 
let fileName = "_testdb.db";
const n = Deno.env.get( "OAK_SQLITE_FILE");
if (n) fileName = n; 
createAllTables(appsArray, fileName);
