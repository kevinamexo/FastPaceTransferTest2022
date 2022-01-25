const mysql = require("mysql");
// const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  user: "sqluser",
  host: "localhost",
  password: "password",
  database: "fastpacetest",
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
