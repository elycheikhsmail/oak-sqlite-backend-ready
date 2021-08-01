import * as t from "https://deno.land/std@0.102.0/testing/asserts.ts";
import { getBaseUrl, getHeaders } from "./test-helper.ts";
const todoUrl = getBaseUrl();

interface userInterface {
  username: string;
  password: string;
}
async function register(user: userInterface) {
  const headers = getHeaders();
  const response = await fetch(todoUrl + "/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: headers,
  });
  const jsonData = await response.json();
  return jsonData;
}

async function login(user: userInterface) {
  const headers = getHeaders();
  const response = await fetch(todoUrl + "/auth/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers,
  });
  const jsonData = await response.json();
  return jsonData;
}

export async function add(obj: Record<string, unknown>,objectName:string, token: string) {
  const headers = getHeaders(token);
  const response = await fetch(todoUrl + "/api/v1/objects/"+objectName, {
    method: "POST",
    body: JSON.stringify(obj),
    headers,
  });
  const jsonData = await response.json();
  //await response.
  return { jsonData };
}
//

export async function getAll(token: string) {
  const headers = getHeaders(token);
  const response = await fetch(todoUrl + "/api/v1/objects", {
    method:"GET",
    headers,
  }); 
  const jsonData = await response.json();
  return jsonData
}


export async function getAllByObjectName(token: string,objectName:string) {
  const headers = getHeaders(token);
  const response = await fetch(todoUrl + "/api/v1/objects/"+objectName, {
    method:"GET",
    headers,
  }); 
  const jsonData = await response.json();
  return jsonData
}

Deno.test(
  "auth user can adad",
  async () => {
    // await delay(200)
    const r1 = await register({ username: "sidi", password: "1234" });
    localStorage.setItem("token", r1.accessToken);
    //const r =
    await add({ text: "first object", isDone: true },"todo", r1.accessToken);
    const r = await add({ text: "test ad", isDone: true },"post", r1.accessToken); 
    t.assertEquals(r.jsonData.text, "test ad");
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
    //await delay(200)
    const r1 = await login({ username: "sidi", password: "1234" });
    const r = await getAll(r1.accessToken);  
    t.assertEquals(r.length, 2);
  },
);

Deno.test(
  "should be 2 item in arrays of objects",
  async () => {
    //await delay(200)
    const r1 = await login({ username: "sidi", password: "1234" });
    const r = await getAll(r1.accessToken);  
    t.assertEquals(r.length, 2);
  },
);

Deno.test(
  "getAllByObjectName should be 1 item in arrays of objects",
  async () => {
    //await delay(200)
    const r1 = await login({ username: "sidi", password: "1234" });
    const r = await getAllByObjectName(r1.accessToken,"todo");  
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
