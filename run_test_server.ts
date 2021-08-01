import { app ,port} from "./src/app.ts";
// arg mode for detect mode if needed
Deno.chdir("./src")
Deno.env.set("dbfile","_testdb.db")
await app.listen({ port });

// deno run --allow-all run_test_server.ts
 