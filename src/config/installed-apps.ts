// array of app names
 
// some insttalled may not need db
const installedApps = [ 
    "oak-auth-sqlite-app",
    "oak-objects-sqlite-app", 
]

// by convention we run the command
// file_server
// in scr folder
// we hardcoded the url
const sqlUrlForApps:string[] = [
    "http://0.0.0.0:4507/oak-auth-sqlite-app/config/db.sql",
    "http://0.0.0.0:4507/oak-objects-sqlite-app/config/db.sql"
]

export {
    installedApps,
    sqlUrlForApps
}