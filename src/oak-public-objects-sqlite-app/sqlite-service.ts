//import client from "../config/db_sqlite_client.ts";
import sqlObj from "./sqlite-sql.ts";
import { DB as DbClient } from "./deps.ts";
interface IObject {
  objectName: string;
  itemValue: string;
  ownerId: number;
}

class SqliteService { 
  tn = "todo_task";

  getAll(dbClient: DbClient) {
    const sql = sqlObj.getAll();
    const rows = [...dbClient.query(sql).asObjects()];
    return rows;
  }

 
  getAllByObjectName(dbClient: DbClient,objectName: string) {
    const sql = sqlObj.getAllByObjectName();
    const rows = [...dbClient.query(sql, [objectName]).asObjects()];
    return rows;
  }

  getByIdAndObjectName(dbClient: DbClient, id: number,objectName:string){
    const sql = sqlObj.getByIdAndObjectName();
    console.log(sql);
    try {
      const rows = [...dbClient.query(sql, [id,objectName]).asObjects()];
      console.log(rows);
      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

const sqliteService = new SqliteService();
export default sqliteService;
