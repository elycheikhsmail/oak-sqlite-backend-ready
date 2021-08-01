let todoUrl = "http://localhost:8080";
// if want change the default url
const u = Deno.env.get("OAK_SQLITE_BASE_URL");
if (u) todoUrl = u;

export async function getAll() {
  const response = await fetch(todoUrl + "/api/todos", {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const jsonData = await response.json(); //as todoInDb[];
  return jsonData;
}
