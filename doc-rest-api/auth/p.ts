let todoUrl = "http://localhost:8080"; 
if(Deno){
    const u = Deno.env.get("OAK_SQLITE_BASE_URL");
    if (u) todoUrl = u;    
}

export async function p( ) {
    const token = localStorage.getItem("token")

  const response = await fetch(todoUrl + "/auth/p", {
    method: "POST", 
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

 // --location "http://localhost:8080"
const {jsonData} = await p()
console.log(jsonData)