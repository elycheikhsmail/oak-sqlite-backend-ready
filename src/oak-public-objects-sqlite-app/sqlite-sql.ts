class SqlObj {
  tn = "objects_objects";

  getAll() {
    let sql = " SELECT itemValue FROM ";
    sql += this.tn;
    return sql;
  }

  getAllByObjectName() {
    let sql = " SELECT itemValue FROM ";
    sql += this.tn;
    sql += " WHERE ";
    sql += " objectName = ? ";
    return sql;
  }

  getById() {
    let sql = " SELECT * FROM ";
    sql += this.tn;
    sql += " WHERE ";
    sql += " id = ?  ";
    return sql;
  }
}

const sqlObj = new SqlObj();
export default sqlObj;
