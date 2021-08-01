import { todoInDb } from "../intefaces/todo.ts";
let todoUrl = "http://localhost:8080";
// if want change the default url
const u = Deno.env.get("OAK_SQLITE_BASE_URL");
if (u) todoUrl = u;

export async function getAll() {
  const token = localStorage.getItem("token")
  const response = await fetch(todoUrl + "/api/todos", {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "authorization": `bearer ${token}`
    },
  });
  const jsonData = await response.json(); //as todoInDb[];
  return jsonData;
}


const responseJson = await getAll() as todoInDb[]

console.log(responseJson)


// deno run --allow-net --allow-env getall.ts
 