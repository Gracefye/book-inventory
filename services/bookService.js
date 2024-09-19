const bookModel = require('../models/bookModel');

const bookService = {
  // Get all books
  getAllBooks: async () => {
    try {
      const books = await bookModel.query('SELECT * FROM inventory', []);
      return books;
    } catch (err) {
      throw new Error('Failed to retrieve books');
    }
  },

  // Filter books by title, author, genre, and publication date
  filterBooks: async (filters) => {
    let sql = 'SELECT title, author, genre, publication_date, isbn FROM inventory WHERE 1=1';
    const params = [];

    // Add filters
    if (filters.title) {
      sql += ' AND title LIKE ?';
      params.push(`%${filters.title}%`);
    }

    if (filters.author) {
      sql += ' AND author LIKE ?';
      params.push(`%${filters.author}%`);
    }

    if (filters.genre) {
      sql += ' AND genre LIKE ?';
      params.push(`%${filters.genre}%`);
    }

    if (filters.publication_date) {
      sql += ' AND publication_date = ?';
      params.push(filters.publication_date);
    }

    // add order
    sql += ' Order by title';

    try {
      const rows = await bookModel.query(sql, params);
      return rows;
    } catch (err) {
      throw err;
    }
  },

  // Add a book
  addBook: async (book) => {
    try {
      await bookModel.add(book);
    } catch (err) {
      throw err;
    }
  },

  // Validate ISBN uniqueness
  isISBNUnique: async (isbn) => {
    try {
      const data = await bookModel.findByISBN(isbn);
      return data.length === 0;
    } catch (err) {
      throw err;
    }
  }
};

// Export the Book service
module.exports = bookService;