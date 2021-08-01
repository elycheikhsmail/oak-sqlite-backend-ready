 import { app ,port} from "./src/app.ts"; 
 Deno.chdir("./src")
 await app.listen({ port });
