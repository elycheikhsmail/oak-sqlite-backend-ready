import { Application } from "./../deps.ts";    
const app = new Application();


import { oakCors } from "https://deno.land/x/cors/mod.ts";
app.use(oakCors({ origin: "*" }));

import { logUrlMiddlware } from "./db-middlwares/url-middlware.ts";
app.use( logUrlMiddlware )


import { setDbClientMiddlware } from "./db-middlwares/sqlte-middlware.ts";
app.use(setDbClientMiddlware) 

import { setUserStateMiddlware } from "../oak-auth-sqlite-app/mod.ts";
app.use(setUserStateMiddlware)




export { app };
