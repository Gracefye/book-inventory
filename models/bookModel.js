// Purpose: Create a Book model
const db = require('../config/db');

const BookModel = {
  // Get books
  query: (sql, params) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  // Add a book
  add: (book) => {
    const sql = 'INSERT INTO inventory SET ?';
    return new Promise((resolve, reject) => {
      db.query(sql, book, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  // Find a book by ISBN
  findByISBN: (isbn) => {
    const sql = 'SELECT * FROM inventory WHERE isbn = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, isbn, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },
};

// Export the Book model
module.exports = BookModel;