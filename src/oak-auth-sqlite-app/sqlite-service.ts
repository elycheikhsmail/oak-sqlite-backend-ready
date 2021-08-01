import userSql from "./sqlite-sql.ts";
//import { Status } from "./deps.ts";
import { DB as DbClient } from "./deps.ts";
import { createToken, hashPassword } from "./utiles.ts";
import { loginResp, userInDb } from "./types.ts";

//const mockedUser: userOut = { id: 1, username: "" };

class UserService {
  async getByName(
    dbClient: DbClient,
    name: string,
  ): Promise<userInDb | undefined> {
    try {
      const sql = userSql.getByUsername();
      const users = [
        ...await dbClient.query(sql, [name]).asObjects(),
      ] as userInDb[]; 
      return users[0];
    } catch (error) {
      console.log({ error });
      return undefined;
    }
  }

  async getById(
    dbClient: DbClient,
    name: string,
  ): Promise<userInDb | undefined> {
    try {
      const sql = userSql.getById();
      const users = [
        ...await dbClient.query(sql, [name]).asObjects(),
      ] as userInDb[]; 
      return users[0];
    } catch (error) {
      console.log({ error });
      return undefined;
    }
  }

  async login(
    dbClient: DbClient,
    username: string,
    password: string,
  ): Promise<loginResp> {
    const hashedPassword = hashPassword(password);
    const sqlGet = userSql.getByUsername();
    const rows = [
      ...dbClient.query(sqlGet, [username]).asObjects(),
    ] as userInDb[];
    if (rows.length > 0 && hashedPassword == rows[0].password) {
      const currentUser = rows[0];
      const token = await createToken(currentUser.id, currentUser.username);
      return {
        isAuthentifcated: true,
        accessToken: token,
        tokenType: "bareer",
      };
    } else {
      return {
        isAuthentifcated: false,
        details: "username and password don't match",
      };
    }
  }

  async register(
    dbClient: DbClient,
    username: string,
    password: string,
  ): Promise<loginResp> {
    let resp: loginResp = { isAuthentifcated: false };
    const user = await this.getByName(dbClient, username); 
    if (user) {
      resp = {
        isAuthentifcated: false,
        details: "user already exist",
      };
    } else {
      try {
        const sqlSave = userSql.save();
        const hashedPassword = hashPassword(password);
        await dbClient.query(sqlSave, [username, hashedPassword]);
        const id = dbClient.lastInsertRowId;
        const currentUser = await this.getById(dbClient, String(id));

        if (currentUser) {
          const token = await createToken(currentUser.id, currentUser.username);
          resp = {
            isAuthentifcated: true,
            accessToken: token,
            tokenType: "bareer",
            details: "success register",
          };
        } else {
          resp = {
            isAuthentifcated: false,
            details: "username and password don't match",
          };
        }
      } catch (_error) {
        resp = {
          isAuthentifcated: false,
          details: "username and password don't match",
        };
      }
    }
    return resp;
  }
}

const userService = new UserService();
export default userService;
