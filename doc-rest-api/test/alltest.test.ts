import * as t from "https://deno.land/std@0.102.0/testing/asserts.ts";
import { getBaseUrl, getHeaders,userInterface,fetchHepler } from "./test-helper.ts";
const todoUrl = getBaseUrl();

 
async function register(user: userInterface) { 
 fetchHepler.setUrl(todoUrl + "/auth/register")
  const response = await fetchHepler.POST(JSON.stringify(user))
  const jsonData = await response.json();
  return jsonData;
}

async function login(user: userInterface) { 
  fetchHepler.setUrl(todoUrl + "/auth/login")
   const response = await fetchHepler.POST(JSON.stringify(user))
   const jsonData = await response.json();
   return jsonData;
 }
 
 
export async function add(
  obj: Record<string, unknown>,
  objectName: string,
  token: string,
) {
  fetchHepler.setUrl(todoUrl + "/api/v1/objects/" + objectName)
  fetchHepler.setToken(token)
  fetchHepler.setHeaders()
  const response = await fetchHepler.POST(JSON.stringify(obj)) 
  const jsonData = await response.json(); 
  return { jsonData };
}

export async function getAll(token: string) {
  fetchHepler.setUrl(todoUrl + "/api/v1/objects")
  fetchHepler.setToken(token)
  fetchHepler.setHeaders()
  const response = await fetchHepler.GET() 
  const jsonData = await response.json();
  return jsonData;
}

 
export async function getAllByObjectName(token: string, objectName: string) {
  fetchHepler.setUrl(todoUrl + "/api/v1/objects/" + objectName)
  fetchHepler.setToken(token)
  fetchHepler.setHeaders()
  const response = await fetchHepler.GET() 
  const jsonData = await response.json();
  return jsonData;
}
 

export async function getAllByObjectNameAndId(
  token: string,
  objectName: string,
  id: number,
) { 
  const url = `${todoUrl}/api/v1/objects/${objectName}/${id}`;
  fetchHepler.setUrl(url)
  fetchHepler.setToken(token)
  fetchHepler.setHeaders()
  const response = await fetchHepler.GET() 
  const jsonData = await response.json();
  return jsonData;
}

const userSidi = { username: "sidi", password: "1234" }
const obj1 = { text: "first object", isDone: true }
const obj2 = { text: "test ad", isDone: true }
Deno.test(
  "auth user can add  ",
  async () => { 
    const r1 = await register(userSidi);
    localStorage.setItem("token", r1.accessToken); 
    await add(obj1, "todo", r1.accessToken);
    const r = await add(obj2,"post",r1.accessToken,);
    t.assertEquals(r.jsonData.text, "test ad");
  },
);

Deno.test(
  "auth user  get by id and object name",
  async () => {
    const token = localStorage.getItem("token") || "";
    const r2 = await getAllByObjectNameAndId(token, "todo", 1);
    //console.log({r2})
    t.assertEquals(r2.text, "first object");
  },
);

// Deno.test(
//   "auth user can ad only for him self",
//   async () => {
//     //await delay(200)
//     const r1 = await register({ username: "ely", password: "1234" });
//     const r = await add({text:"test2"},"todo", r1.accessToken);
//     t.assertEquals(r.jsonData.ownerId, 2);
//   },
// ); 
Deno.test(
  "should be 3 item in arrays of objects",
  async () => { 
    const r1 = await login(userSidi);
    const r = await getAll(r1.accessToken);
    t.assertEquals(r.length, 2);
  },
);

Deno.test(
  "should be 2 item in arrays of objects",
  async () => {
    //await delay(200)
    const r1 = await login(userSidi);
    const r = await getAll(r1.accessToken);
    t.assertEquals(r.length, 2);
  },
);

Deno.test(
  "getAllByObjectName should be 1 item in arrays of objects",
  async () => {
    //await delay(200)
    const r1 = await login(userSidi);
    const r = await getAllByObjectName(r1.accessToken, "todo");
    t.assertEquals(r.length, 1);
  },
);

// Deno.test(
//   "auth user can delete only his own todos",
//   async () => {
//     //await delay(200)
//     const token = localStorage.getItem("token")
//     const s = await deleteItem(String(token),2);
//     t.assertEquals(s,401)
//   },
// );
