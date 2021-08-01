import { DB } from "https://deno.land/x/sqlite@v2.4.2/mod.ts";
import { getDbClient,getSqlieFileName } from "../config/db_sqlite_client.ts";

export function initDb(dbClient: DB, path: string) {
  const text = Deno.readTextFileSync(path);
  const sqlStatements = text.split(";");
  for (const sql of sqlStatements) {
    if (sql) dbClient.query(sql);
  }
}

export function getSqlPath() {
  const cwd = import.meta.url.replaceAll("/initdb.ts", "")
    .replaceAll("file:///", "/");
  const cwf2 = cwd + "/db.sql";
  return cwf2;
}

export { getDbClient,getSqlieFileName };
