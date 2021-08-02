import { Context, Status } from "https://deno.land/x/oak@v7.7.0/mod.ts";
// this import must be from url instead of relative path
import dbService from "./sqlite-service.ts";

export function getAllController(ctx: Context) {
  const dbClient = ctx.state.dbClient;
  const allObjects = dbService.getAll(dbClient);
  const allObjects2 = [];
  for (const item of allObjects) {
    const itemObject = JSON.parse(item.itemValue);
    allObjects2.push(itemObject);
  }
  ctx.response.body = allObjects2;
}

export function getByIdController(ctx: Context) {
  const dbClient = ctx.state.dbClient;
  //
  const pathnameArray = ctx.request.url.pathname.split("/");
  const objectName = String(pathnameArray.at(-2));
  const objectIdStr = String(pathnameArray.at(-1));
  const objectId = parseInt(objectIdStr);
  //

  const allObjects = dbService.getByIdAndObjectName(
    dbClient,
    objectId,
    objectName,
  );
  if (allObjects.length == 0) {
    ctx.response.status = Status.NotFound
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

export function getAllByObjectNameController(ctx: Context) {
  const dbClient = ctx.state.dbClient;
  //
  const pathnameArray = ctx.request.url.pathname.split("/");
  const objectName = String(pathnameArray.at(-1));
  //

  const allObjects = dbService.getAllByObjectName(dbClient, objectName);
  const allObjects2 = [];
  for (const item of allObjects) {
    const itemObject = JSON.parse(item.itemValue);
    allObjects2.push(itemObject);
  }
  ctx.response.body = allObjects2;
}
