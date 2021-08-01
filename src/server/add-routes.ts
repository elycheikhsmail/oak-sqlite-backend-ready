import { app } from "./add-middlware.ts";
//
import { routes as objectRouters } from "./../oak-objects-sqlite-app/mod.ts";
app.use(
  objectRouters
    .prefix("/api/v1/objects")
    .routes(),
);
app.use(objectRouters.allowedMethods());
//
import { routes as publicObjectRouters } from "./../oak-public-objects-sqlite-app/mod.ts";
app.use(
  publicObjectRouters
    .prefix("/api/v1/publicobjects")
    .routes(),
);

app.use(publicObjectRouters.allowedMethods());
// 
 
//
import { routes as authRoutes } from "../oak-auth-sqlite-app/mod.ts";
app.use(authRoutes.allowedMethods());
app.use(
  authRoutes
    .prefix("/auth")
    .routes(),
);

export { app };
