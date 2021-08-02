class SqlObj {
  tn = "objects_objects";

  getAll() {
    let sql = " SELECT itemValue FROM ";
    sql += this.tn;
    sql += " WHERE ";
    sql += " ownerId = ? ";
    return sql;
  }
 

  getAllByObjectName() {
    let sql = " SELECT itemValue FROM ";
    sql += this.tn;
    sql += " WHERE ";
    sql += " ownerId = ? AND";
    sql += " objectName = ? ";
    return sql;
  }

  
  getById() {
    let sql = " SELECT * FROM ";
    sql += this.tn;
    sql += " WHERE ";
    sql += " owner_id = ? AND id = ?  ";
    return sql;
  }


  getByIdAndObjectName() {
    let sql = " SELECT * FROM ";
    sql += this.tn;
    sql += " WHERE ";
    sql += " ownerId = ? AND id = ? AND objectName = ?  ";
    return sql;
  }


 
  save() {
    let sql = "INSERT INTO ";
    sql += this.tn;
    sql += " ( ";
    sql += " ownerId , objectName, itemValue ";
    sql += " ) VALUES ";
    sql += " (  ";
    sql += " ? , ? ,?";
    sql += " ) ";
    return sql;
  }

  delete() {
    let sql = "DELETE FROM ";
    sql += this.tn;
    sql += " WHERE ";
    sql += " id = ? ";
    return sql;
  }
  deleteAll() {
    let sql = "DELETE FROM ";
    sql += this.tn;
    sql += " WHERE ";
    sql += " 1 > 0 ";
    return sql;
  }

  update() {
    let sql = "UPDATE ";
    sql += this.tn;
    sql += " SET ";
    sql += " itemValue = ? ";
    sql += " WHERE ";
    sql += " id = ? ";
    return sql;
  }
}

const sqlObj = new SqlObj();
export default sqlObj;
