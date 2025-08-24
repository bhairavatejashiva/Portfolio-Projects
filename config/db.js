const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '9396556808',
    database: 'handicraft_store',
});
module.exports = pool.promise();


