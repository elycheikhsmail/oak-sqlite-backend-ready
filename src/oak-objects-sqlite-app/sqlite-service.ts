//import client from "../config/db_sqlite_client.ts";
import sqlObj from "./sqlite-sql.ts";
import { DB as DbClient } from "./deps.ts";
interface IObject {
  objectName: string;
  itemValue: string;
  ownerId: number;
}

class SqliteService {
  // tn = tablenale
  tn = "todo_task";

getAll(dbClient: DbClient, ownerId: number) {
    const sql = sqlObj.getAll();
    const rows =  [...dbClient.query(sql, [ownerId]).asObjects()];
    return rows;
  }

getAllByObjectName(dbClient: DbClient, ownerId: number,objectName:string) {
  const sql = sqlObj.getAllByObjectName(); 
  const rows =  [...dbClient.query(sql, [ownerId,objectName]).asObjects()];
  return rows;
}


  getById(dbClient: DbClient, ownerId: number, id: number): undefined[][] {
    const sql = sqlObj.getById();
    console.log(sql);
    try {
      const rows = [...dbClient.query(sql, [ownerId, id])];
      console.log(rows);
      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async save(dbClient: DbClient, obj: IObject):Promise<number> {
    const sql = sqlObj.save();
    try {
      await dbClient.query(sql, [obj.ownerId, obj.objectName, obj.itemValue]);
      return dbClient.lastInsertRowId;
    } catch (error) {
      console.log({ error });
      return -1;
    }
  }

  delete(dbClient: DbClient, id: number) {
    const sql = sqlObj.delete();
    try {
      //const deleted =
      dbClient.query(sql, [id]);
      //console.log("deleted : ", deleted);
      const dbchanges = dbClient.changes;
      return dbchanges;
    } catch (error) {
      console.log({ error });
    }
  }

  async deleteAll(dbClient: DbClient): Promise<number> {
    const sql = sqlObj.deleteAll();
    try {
      await dbClient.query(sql);
      return dbClient.changes;
    } catch (error) {
      console.log({ error });
      return -1;
    }
  }

  async update(dbClient: DbClient, id: number, itemValue: string) {
    const sql = sqlObj.update();

    try {
      await dbClient.query(sql, [itemValue, id]);
      // console.log("deleted : ", deleted);
      return dbClient.changes;
    } catch (error) {
      console.log({ error });
    }
  }
}

const sqliteService = new SqliteService();
export default sqliteService;
