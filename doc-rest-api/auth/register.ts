let todoUrl = "http://localhost:8080";
// if want change the default url
// allow running this script in browser (after bundling it)
if(Deno){
  const u = Deno.env.get("OAK_SQLITE_BASE_URL");
  if (u) todoUrl = u;    
}

export async function register(username: string, password: string) {
  const response = await fetch(todoUrl + "/auth/register", {
    method: "POST",
    body: JSON.stringify(
      {
        username,
        password,
      },
    ),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  //console.log(response)
  const jsonData = await response.json();
  return {response,jsonData};
}

 
// deno run --allow-net --allow-env login.ts
 
const {response,jsonData} = await register("sidi","1234") //as todoInDb[]

//console.log(response)
console.log({jsonData})
console.log(response.status)
if(response.status == 200){
    console.log("save in localstorage")
}else{
    console.log("auth failed")
}

