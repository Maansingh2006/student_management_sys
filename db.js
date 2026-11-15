require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createPool({// connection pool banana
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "_maansinghh7657914676",
    database: "student_system"
});

module.exports = db.promise(); // is database object ko doosri file mein use krna


// iska kaam node.js ko mysql databse ke saath connect krna --mysq12