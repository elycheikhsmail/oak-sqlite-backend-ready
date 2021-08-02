import { DB } from "https://deno.land/x/sqlite@v2.4.2/mod.ts";

import { getDbClient,getSqlieFileName } from "../config/db_sqlite_client.ts";

export function initDb(dbClient: DB, text: string) { 
  const sqlStatements = text.split(";");
  for (const sql of sqlStatements) {
    if (sql) dbClient.query(sql);
  }
}
 

export { getDbClient ,getSqlieFileName};
