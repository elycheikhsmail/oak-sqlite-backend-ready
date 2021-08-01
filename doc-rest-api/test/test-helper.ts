
export function getBaseUrl(){
    let todoUrl = "http://localhost:8080";
    if (Deno) {
      const u = Deno.env.get("OAK_SQLITE_BASE_URL");
      if (u) todoUrl = u;
    }
    return todoUrl
}


export function getHeaders(token?: string): {
  "Content-Type": string;
  "Access-Control-Allow-Origin": string;
  authorization?: string;
} {
  const headers1 = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const headers2 = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "authorization": `bearer ${token}`,
  };
  if (token) return headers2;
  else return headers1;
}