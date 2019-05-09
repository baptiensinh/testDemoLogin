module.exports.Login = async function (email, matkhau) {
    var mysql = require('mysql2/promise');
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'map',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    var users;
    users = await pool.query("select * from user where Email='"
        + email + "' and MatKhau='" + matkhau + "'");
    var record;
    MangUsers = users[0];
    if (MangUsers.length > 0) {
        record = MangUsers[0];
    }
    else
        record = 0;
    return record;
};
module.exports.Register =
    async function (tendn, matkhau, email) {
    var mysql = require('mysql2/promise');
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'map',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    var record=1;
    users = await pool.query("select * from user where Email='"
    + email + "'");
    users1 = await pool.query("select * from user where TenDN='" + tendn + "'");
    MangUsers1 = users1[0];
    MangUsers = users[0];
    if (MangUsers.length > 0) {
        return record = 0 ;
        }
    else{ if (MangUsers1.length > 0) {
            return record = 0 ;}
            else {
    var sql = "insert into user(TenDN,MatKhau,Email) values ('" + tendn + "','" + matkhau +"','" + email + "')";
    users = await pool.query(sql);
    return record;
            };
    };
};