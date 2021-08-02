import { Context, Status } from "https://deno.land/x/oak@v7.7.0/mod.ts";
// this import must be from url instead of relative path
import { IGetByIdAndObjectNameInput } from "./types.ts";
import { userState } from "../oak-auth-sqlite-app/types.ts";
import dbService from "./sqlite-service.ts";

export function getAllController(ctx: Context) {
  const state = ctx.state as { data: userState };
  const dbClient = ctx.state.dbClient;
  const user = state.data.user;
  if (!state.data.isAuth) {
    ctx.response.status = Status.NetworkAuthenticationRequired;
    ctx.response.body = {
      details: state.data.message,
    };
  } else {
    const allObjects = dbService.getAll(dbClient, user.id);
    const allObjects2 = [];
    for (const item of allObjects) {
      const itemObject = JSON.parse(item.itemValue);
      allObjects2.push(itemObject);
    }
    ctx.response.body = allObjects2;
  }
}


export function getAllByObjectNameController(ctx: Context) {
  const state = ctx.state as { data: userState };
  const dbClient = ctx.state.dbClient;
  const user = state.data.user;

  if (!state.data.isAuth) {
    ctx.response.status = Status.NetworkAuthenticationRequired;
    ctx.response.body = {
      details: state.data.message,
    };
  } else {
    //
    const pathnameArray = ctx.request.url.pathname.split("/");
    const objectName = String(pathnameArray.at(-1));
    //
    const allObjects = dbService.getAllByObjectName(
      dbClient,
      user.id,
      objectName,
    );
    const allObjects2 = [];
    for (const item of allObjects) {
      const itemObject = JSON.parse(item.itemValue);
      allObjects2.push(itemObject);
    }
    ctx.response.body = allObjects2;
  }
}


//start
export function getByIdAndObjectNameController(ctx: Context) {
  const state = ctx.state as { data: userState };
  const dbClient = ctx.state.dbClient;
  const user = state.data.user;
  // 
  const pathnameArray = ctx.request.url.pathname.split("/");
  const objectName = String(pathnameArray.at(-2));
  const objectIdStr = String(pathnameArray.at(-1));
  const objectId = parseInt(objectIdStr);
  //
  const obj: IGetByIdAndObjectNameInput = {
    id: objectId,
    objectName,
    ownerId: user.id,
  };
  const allObjects = dbService.getByIdAndObjectName(dbClient, obj);
  if (allObjects.length == 0) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = {
      details: "object doe'snt exist",
    };
  } else {
    const allObjects2 = [];
    for (const item of allObjects) {
      const itemObject = JSON.parse(item.itemValue);
      allObjects2.push(itemObject);
    }
    ctx.response.body = allObjects2[0];
  }
}

export function deleteByIdController(ctx: Context) {
  const state = ctx.state as { data: userState };
  const dbClient = ctx.state.dbClient;
  const user = state.data.user;
  //

  const pathnameArray = ctx.request.url.pathname.split("/");
  const objectName = String(pathnameArray.at(-2));
  const objectIdStr = String(pathnameArray.at(-1));
  const objectId = parseInt(objectIdStr);
  //
  const obj: IGetByIdAndObjectNameInput = {
    id: objectId,
    objectName,
    ownerId: user.id,
  };
  const allObjects = dbService.getByIdAndObjectName(dbClient, obj);
  if (allObjects.length == 0) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = {
      details: "object doe'snt exist",
    };
  } else {
    //
    dbService.delete(dbClient, objectId);
    ctx.response.body = {
      details: "object object succefully deleted ",
    };
  }
}

export async function addController(ctx: Context) {
  const state = ctx.state as { data: userState };
  const dbClient = ctx.state.dbClient;

  if (!state.data.isAuth) {
    ctx.response.status = Status.NetworkAuthenticationRequired;
    ctx.response.body = {
      details: state.data.message,
    };
  } else {
    const dtataPromise = ctx.request.body(); //{ type: 'json' }
    const data = await dtataPromise.value;
    const ownerId = state.data.user.id;
    //
    const pathnameArray = ctx.request.url.pathname.split("/");
    const objectName = String(pathnameArray.at(-1));
    //
    const objectToStor = {
      objectName, //must come from user
      ownerId,
      itemValue: JSON.stringify(data),
    };

    const objectId = await dbService.save(dbClient, objectToStor);
    if (objectId > 0) {
      const updatedData = JSON.stringify({ ...data, id: objectId, ownerId });
      await dbService.update(dbClient, objectId, updatedData);
      ctx.response.body = {
        id: objectId,
        ...data,
        ownerId,
      };
    } else {
      ctx.response.body = {
        details: "sql error happen ",
      };
    }
  }
}

// parse objectString

export async function updateController(ctx: Context) {
  const state = ctx.state as { data: userState };
  const dbClient = ctx.state.dbClient;
  const user = state.data.user;

  if (!state.data.isAuth) {
    ctx.response.status = Status.NetworkAuthenticationRequired;
    ctx.response.body = {
      details: state.data.message,
    };
  } else {
    // retrive data from request
    const dtataPromise = ctx.request.body(); //{ type: 'json' }
    const data = await dtataPromise.value;
    const ownerId = state.data.user.id;
    const pathnameArray = ctx.request.url.pathname.split("/");
    const objectName = String(pathnameArray.at(-2));
    const objectIdStr = String(pathnameArray.at(-1));
    const objectId = parseInt(objectIdStr);
    // get object by id
    const obj: IGetByIdAndObjectNameInput = {
      id: objectId,
      objectName,
      ownerId: user.id,
    };
    const allObjects = dbService.getByIdAndObjectName(dbClient, obj);

    //const _objectId = await dbService.save(dbClient, objectToStor);
    if (allObjects.length > 0) {
      const updatedData = JSON.stringify({ ...data, id: objectId, ownerId });
      // upade object
      await dbService.update(dbClient, objectId, updatedData);
      ctx.response.body = {
        id: objectId,
        ...data,
        ownerId,
      };
    } else {
      ctx.response.status = Status.NotFound;
      ctx.response.body = {
        details: "object doesn't exist ",
      };
    }
  }
}

