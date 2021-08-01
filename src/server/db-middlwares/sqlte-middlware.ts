// recuper le client sqlite  
 
import { DB ,Context} from "../../deps.ts";
import {getDbClient,dbFileName} from "../../config/db_sqlite_client.ts"; 
//puis l'injecter dans le state du middlweare 
export async function setDbClientMiddlware(
  ctx: Context<{ dbClient: DB|null }>,
  next: () => Promise<unknown>
) {
  //console.log("start sqlite middelwear")
  
  try {  
    //console.log({data})
    ctx.state.dbClient = getDbClient(dbFileName)
    //getDbClient("mydb.db")
    await next();
  } catch (error) {
    //console.log(error)
    throw error;
  }
}

 