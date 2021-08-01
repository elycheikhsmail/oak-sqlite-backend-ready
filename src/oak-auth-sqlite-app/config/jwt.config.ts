import type { Header } from "../deps.ts";
const jwtAlgoritheName = "HS256"
const jwtSecretKey:string = Deno.env.get("JwtSecretKey")||"";
const jwtType = "JWT"

const  jwtHeader: Header = {
  alg: jwtAlgoritheName,
  typ: jwtType,
};

 
export {
    jwtAlgoritheName,
    jwtHeader,
    jwtSecretKey,
}