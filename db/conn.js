const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'nodemysql2',
});

module.exports = pool;