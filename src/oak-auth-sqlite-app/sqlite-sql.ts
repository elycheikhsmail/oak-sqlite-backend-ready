import config from "./config/app-config.ts";
class SqlObj{
    tbPrefix=config.table_name_prefix
   // tn=this.tbPrefix+"utilisateurs"
    tn = "auth_utilisateurs"
    getById(){
        let sql = "SELECT * FROM "
        sql += this.tn
        sql += " WHERE "
        sql += " id = ?"
        return sql
    }

    getByUsername(){
        let sql = "SELECT * FROM "
        sql += this.tn
        sql += " WHERE "
        sql += " username = ?"
        return sql
    }
 

    getAll(){
        let sql = "SELECT * FROM "
        sql += this.tn 
        return sql
    }

    save(){
    let sql = "INSERT INTO ";
    sql += this.tn;
    sql += " ( ";
    sql += " username , ";
    sql += " password ";
    sql += " ) VALUES ";
    sql += " (  ";
    sql += " ? ,";
    sql += " ?";
    sql += " ) ";
    return sql
    }

}


const sqlObj = new SqlObj()
export default sqlObj