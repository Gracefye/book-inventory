// Purpose: Establish connection to MySQL database
// Import mysql2 package
const mysql = require('mysql2');

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'BooksDB'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database!');
});

// Connect to MySQL database
module.exports = db;