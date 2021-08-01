import { Context, Status } from "https://deno.land/x/oak@v7.7.0/mod.ts";
// this import must be from url instead of relative path
import { userState } from "../oak-auth-sqlite-app/types.ts";
import dbService from "./sqlite-service.ts";

export  function getAllController(ctx: Context) {
  const state = ctx.state as { data: userState };
  const dbClient = ctx.state.dbClient
  const user = state.data.user
  if (!state.data.isAuth) {
    ctx.response.status = Status.NetworkAuthenticationRequired;
    ctx.response.body = {
      details: state.data.message,
    };
  } else {
    const allObjects = dbService.getAll(dbClient, user.id); 
    const allObjects2 = []
    for (const item of allObjects) {
      const itemObject = JSON.parse(item.itemValue)
      allObjects2.push(itemObject)
    }
    ctx.response.body = allObjects2
  }
}

export  function getAllByObjectNameController(ctx: Context) {
  const state = ctx.state as { data: userState };
  const dbClient = ctx.state.dbClient
  const user = state.data.user
      //
      const pathnameArray = ctx.request.url.pathname.split("/")
      const objectName = String(pathnameArray.at(-1)) 
      //
  if (!state.data.isAuth) {
    ctx.response.status = Status.NetworkAuthenticationRequired;
    ctx.response.body = {
      details: state.data.message,
    };
  } else {
    const allObjects = dbService.getAllByObjectName(dbClient, user.id,objectName); 
    const allObjects2 = []
    for (const item of allObjects) {
      const itemObject = JSON.parse(item.itemValue)
      allObjects2.push(itemObject)
    } 
    ctx.response.body = allObjects2
  }
}

export async function addController(ctx: Context) {
  const state = ctx.state as { data: userState };
  const dbClient = ctx.state.dbClient

  if (!state.data.isAuth) {
    ctx.response.status = Status.NetworkAuthenticationRequired;
    ctx.response.body = {
      details: state.data.message,
    };
  } else { 
    const dtataPromise = ctx.request.body(); //{ type: 'json' }
    const data = await dtataPromise.value; 
    const ownerId = state.data.user.id
    //
    const pathnameArray = ctx.request.url.pathname.split("/")
    const objectName = String(pathnameArray.at(-1)) 
    //
    const objectToStor =  {
      objectName,//must come from user
      ownerId,
      itemValue: JSON.stringify(data),
    }

    const objectId = await dbService.save(dbClient,objectToStor);
    if (objectId > 0) {
      const updatedData = JSON.stringify({...data,id: objectId,ownerId})
      await dbService.update(dbClient,objectId,updatedData)
      ctx.response.body = {
        id: objectId,
        ...data,
        ownerId 
      };
    } else {
      ctx.response.body = {
        details: "sql error happen ",
      };
    }
  }
}
export async function deleteAll(ctx: Context) { 
  const n = await dbService.deleteAll(ctx.state.dbClient); 
  ctx.response.body = { n };
}

export function delteItem(ctx: Context) {
  const state = ctx.state as { data: userState }; 
  if (!state.data.isAuth) {
    ctx.response.status = Status.NetworkAuthenticationRequired;
    ctx.response.body = {
      details: "not auth user",
    };
  } else {
    const pathname = ctx.request.url.pathname;
    const list = pathname.split("/");
    const id1 = list.at(-1);
    // verifier the type od id
    const id = parseInt(String(id1)); 
    const todos = dbService.getById(
      ctx.state.dbClient,
      state.data.user.id,
      id,
    ); 
    if (todos.length == 0) {
      ctx.response.status = Status.Unauthorized;
      ctx.response.body = {
        details: "not found",
      };
    } else {
      // delete item
      dbService.delete(ctx.state.dbClient, id);
      ctx.response.status = Status.OK;
      ctx.response.body = {
        details: "task done",
      };
    }
  }
}
