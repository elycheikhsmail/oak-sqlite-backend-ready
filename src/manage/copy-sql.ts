// set in mind this script will be from run.json level
// retreive installed app list/array
import { installedApps } from "../config/installed-apps.ts";
// be in src level
let text = ""
console.log(Deno.cwd()) 
for (let index = 0; index < installedApps.length; index++) {
    const element = installedApps[index]; 
    const p = `${Deno.cwd()}/src/${element}/config/db.sql` 
    text +=  Deno.readTextFileSync(p)
}

console.log(text)

const pm = `${Deno.cwd()}/src/manage/db.sql` 
console.log({pm})
Deno.writeTextFile(pm,text)
// console log file conenent
export {
     installedApps
}
