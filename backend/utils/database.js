import mysql from "mysql2";
import dotenv from "dotenv";

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

export default pool;
