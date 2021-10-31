const mysql = require("mysql"); //เรียกใช้ module
const dbConfig = require("../configs/db.config");

//Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST, 
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

//Open the MySQL connection
connection.connect((error) => { //สั่งให้เชื่อมต่อ
    if (error) throw error; 
    console.log("Successfully connected to the database ....");
});

module.exports = connection;