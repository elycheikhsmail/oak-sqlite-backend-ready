import { Context } from "./../deps.ts"; 
import { userState } from "./../types.ts";
 import { oakAuthHelper } from "./auth-helper.ts";
 
 

export async function setUserStateMiddlware(
  ctx: Context<{ data: userState|null }>,
  next: () => Promise<unknown>
) {
  //console.log("start handleauthHeader middelwear")
  
  try { 
    //{state} = ctx
    const data =  await oakAuthHelper(ctx)
    //console.log({data})
    ctx.state.data = data
    await next();
  } catch (error) {
    throw error;
  }
}


export async function handleErrorsMiddlware(
  context: Context,
  next: () => Promise<unknown>
) {
  try {
    await next();
  } catch (err) {
    context.response.status = err.status;
    const { message = "unknown error", status = 500, stack = null } = err;
    context.response.body = { message, status, stack };
    context.response.type = "json";
  }
}

 

