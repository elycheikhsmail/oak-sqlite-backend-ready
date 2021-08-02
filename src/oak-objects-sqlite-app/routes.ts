import { Router,Context } from "https://deno.land/x/oak@v7.7.0/mod.ts"; 
 
import {
  addController, 
  //getController,
  getAllController,
  getAllByObjectNameController,
  getByIdAndObjectNameController,
  deleteByIdController,
  updateController

} from "./controller.ts";

const router = new Router(); 

//router.delete("/dd", async (ctx: Context) => await deleteAll(ctx));

router.get("/", (ctx: Context) => getAllController(ctx));



router.get("/:objectName", (ctx: Context) => getAllByObjectNameController(ctx));
 

router.get("/:objectName/:id", (ctx: Context) => getByIdAndObjectNameController(ctx));

router.post("/:objectName", async (ctx: Context) => await addController(ctx));

router.delete("/:objectName/:id", (ctx: Context) => deleteByIdController(ctx))

router.put("/:objectName/:id", (ctx: Context) => updateController(ctx))
 
export { router as todoRouters };
