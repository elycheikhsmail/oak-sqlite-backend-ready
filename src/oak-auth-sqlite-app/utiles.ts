// on a besoin d'un secret key
import { create, getNumericDate, verify } from "./deps.ts"
import type { Payload } from "./deps.ts"
import { jwtAlgoritheName,jwtHeader,jwtSecretKey  } from "./config/jwt.config.ts";
interface verifyTokenResult {
  isValid: boolean;
  id:string;
  username:string;
 // data: Record<string, unknown>;
}

function hashPassword(password: string): string {
  return password + "1234";
}


async function createToken(id: number, username: string):Promise<string>{
  const payload: Payload = {
    id,
    username, 
    exp: getNumericDate(6000),
  };
  const jwtToken = await create(jwtHeader, payload, jwtSecretKey)  
  return jwtToken
}

async function verifyToken(token: string): Promise<verifyTokenResult>{ 
    let response:verifyTokenResult = {
      isValid: true,
      id:"",
      username:""

     
    }
    await verify(token, jwtSecretKey, jwtAlgoritheName).then(
      (data)=>  {
        //console.log({data})
       response = {
         isValid:true,
         id:String(data?.id),
         username:String(data?.username)
       }
      //  return {
      //   isValid: true,
      //   data:{id:parseInt(data["id"]),username:data["username"]},
      //  }
      }
    ).catch(
      (errors) =>  {
        //console.log({errors})
        response.isValid = false
      }
      )
      return response
 
}

export { createToken, hashPassword, verifyToken };
