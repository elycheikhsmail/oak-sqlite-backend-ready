import { Context } from "./../deps.ts";
import { verifyToken } from "./../utiles.ts";
import userService from "./../sqlite-service.ts";
import { userOut, userState,nonAuthCases } from "./../types.ts";
import { DB } from "./../deps.ts";
 

export async function oakAuthHelper(
  ctx: Context,
): Promise<userState> {
  //console.log("start oakAuthHleper")
  let currentUser: userOut = {
    id: -1,
    username: "",
  };
  const defaultData: userState = {
    user: currentUser,
    isAuth: false,
    message:"" 
  };

  const jwtToken = ctx.request.headers.get("authorization")?.split("bearer ")?.[1] || ""; 
  if (!jwtToken) {
    defaultData.message = nonAuthCases.emtyToken 
    return defaultData;
  } else {
    const validatedJwt = await verifyToken(jwtToken); 
    if (validatedJwt.isValid == false) { 
      defaultData.message = nonAuthCases.invalidToken
      return defaultData;
    } else {
      const user = await userService.getByName(
        ctx.state.dbClient as DB,
        validatedJwt.username);

      if (!user) { 
        defaultData.message = nonAuthCases.cantRetriveUser 
        return defaultData;
      } else {
        currentUser = {
          id: user.id,
          username: user.username,
        };

        return {
          user: currentUser,
          isAuth: true,
          message: "",
        };
      }
    }
  }
  //return currentUser;
}
