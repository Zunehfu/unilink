const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

console.log("MYSQL credentials");
console.log("-----------------------------");
console.log(
    process.env.mysql_host,
    process.env.mysql_port,
    process.env.mysql_user,
    process.env.mysql_password,
    process.env.mysql_database
);
console.log("-----------------------------");

const pool = mysql
    .createPool({
        host: process.env.mysql_host,
        port: process.env.mysql_port,
        user: process.env.mysql_user,
        password: process.env.mysql_password,
        database: process.env.mysql_database,
    })
    .promise();

module.exports = pool;
