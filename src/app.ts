 import { app } from "./server/add-routes.ts";
import { parse } from "./deps.ts";  

const { args } = Deno;
const DEFAULT_PORT = 8080;
const argPort = parse(args).port;
console.log({argPort})

const port =argPort ? Number(argPort) : DEFAULT_PORT 
console.log({port}) 


export{app,port}