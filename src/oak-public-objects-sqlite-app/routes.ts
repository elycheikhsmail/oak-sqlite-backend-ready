import { Router,Context } from "https://deno.land/x/oak@v7.7.0/mod.ts"; 
 
import {  
  getAllController,
  getAllByObjectNameController, 

} from "./controller.ts";

const router = new Router(); 
 

router.get("/", (ctx: Context) => getAllController(ctx));

router.get("/:objectName", (ctx: Context) => getAllByObjectNameController(ctx));
 
 
export { router as todoRouters };
