import { Router, Status } from "./deps.ts";
import dbService from "./sqlite-service.ts";
import { userState } from "./types.ts"; 
//import { DB } from "./deps.ts";

const router = new Router();
 
router.post("/register", async (ctx) => { 
  const dataPromise = ctx.request.body(); //{ type: 'json' }
  const { username, password } = await dataPromise.value;
  if (!username || !password) {
    ctx.response.body = {
      message: "username or password is empty",
    };
  } else {
 
    const resp = await dbService.register(
      ctx.state.dbClient,
      username,
      password,
    ); 
    ctx.response.body = resp;
    if ( !resp.isAuthentifcated ) {
      ctx.response.status = Status.Unauthorized;
    }
  }
});

router.post("/login", async (ctx) => {
  const dataPromise = ctx.request.body(); //{ type: 'json' }
  const { username, password } = await dataPromise.value;
  if (!username || !password) { 
    ctx.response.body = {
      message: "username or password is empty",
    };
  } else {
    const resp = await dbService.login(
      ctx.state.dbClient,
      username,
      password,
    );
 
    if (!resp.isAuthentifcated ) {
      ctx.response.status = Status.Unauthorized;
    }
    ctx.response.body = resp;
  }
});

// for testing that prtected url can't accessed by ananymus user
router.post("/p", (ctx) => {
  const state = ctx.state as { data: userState };
  if (!state.data.isAuth) { 
    ctx.response.status = Status.NetworkAuthenticationRequired 
    ctx.response.body ={
      details:state.data.message
    }
  } else { 
    ctx.response.body = state.data.user;
  }
});

export { router as routes };
