import {
  copy,
  readerFromStreamReader,
} from "https://deno.land/std@0.103.0/io/mod.ts";

// read from nework
import { sqlUrlForApps } from "../config/installed-apps.ts";
const file = await Deno.open("./_db2.sql", { create: true, write: true });

for (const url of sqlUrlForApps) {
  //
  console.log({ url }); 
  const res = await fetch(url);
  const reader = readerFromStreamReader(res.body!.getReader());
  await copy(reader, file);
}
file.close();


// deno run --allow-all copy-sql2.ts