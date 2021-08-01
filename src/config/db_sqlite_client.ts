import { DB } from "../deps.ts";

export function getDbClient(path: string) {
  const clientSqlite = new DB(path);
  return clientSqlite;
}

export function getSqlieFileName() {
  let dbFileName = "mydb.db";
  const n = Deno.env.get("OAK_SQLITE_FILE");
  if (n) dbFileName = n;
  //console.log({ dbFileName });
  return dbFileName;
}

const dbFileName = getSqlieFileName();

export { dbFileName };
