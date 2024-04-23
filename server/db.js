const mysql = require("mysql2");
const fs = require("fs");

const db = mysql.createConnection({
  host: "dbms-163.mysql.database.azure.com",
  user: "yatharth163",
  password: "DBMS@202251163",
  database: "books",
  port: 3306,
  ssl: { ca: fs.readFileSync("D:/downloads/DigiCertGlobalRootCA.crt.pem") },
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = db; // Export the 'db' connection
