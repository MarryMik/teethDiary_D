//підключення до бази даних
import mysql from "mysql";
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "GamabUnta6",
    database: "teethdiary"
})
export default db;