import { Context  } from "https://deno.land/x/oak@v7.7.0/mod.ts"; 
export async function logUrlMiddlware(
  ctx: Context ,
  next: () => Promise<unknown>
) { 
  try {  
      //console.log(ctx.request.url.pathname)
      console.log(`${ctx.request.method} : ${ctx.request.url.pathname}`)
    await next();
  } catch (error) {
    //console.log(error)
    throw error;
  }
}

 