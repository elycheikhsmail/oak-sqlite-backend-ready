let todoUrl = "http://localhost:8080"; 
if(Deno){
    const u = Deno.env.get("OAK_SQLITE_BASE_URL");
    if (u) todoUrl = u;    
}

export async function add(text:string) {
    
    const token = localStorage.getItem("token")
  const response = await fetch(todoUrl + "/api/todos", {
    method: "POST",
    body: JSON.stringify(
      {
          text
      },
    ),
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "authorization": `bearer ${token}`
      },
  });
  //console.log(response)
  const jsonData = await response.json();
  //console.log(jsonData)
  return {response,jsonData};
}
//
const r = await add("step by step")
console.log(r)