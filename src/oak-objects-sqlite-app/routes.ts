import { Router,Context } from "https://deno.land/x/oak@v7.7.0/mod.ts"; 
 
import {
  addController,
  deleteAll,
  getAllController,
  getAllByObjectNameController,
  delteItem

} from "./controller.ts";

const router = new Router(); 

router.delete("/dd", async (ctx: Context) => await deleteAll(ctx));

router.get("/", (ctx: Context) => getAllController(ctx));

router.get("/:objectName", (ctx: Context) => getAllByObjectNameController(ctx));
 

router.post("/:objectName", async (ctx: Context) => await addController(ctx));

router.delete("/:id", (ctx: Context) => delteItem(ctx))
 
export { router as todoRouters };
