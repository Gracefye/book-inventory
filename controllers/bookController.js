const { validationResult } = require('express-validator');
const json2csv = require('json2csv').parse;
const moment = require('moment');
const bookService = require('../services/bookService');
const genres = require('../config/genres');

// Function to get the flash messages
const getFlashMessages = (req) => {
  return {
    successMessage: req.flash('success'),
    errorMessage: req.flash('error')
  };
};

const bookController = {
  // GET /
  getHome: (req, res) => {
    // Get the messages from the flash
    const { successMessage, errorMessage } = getFlashMessages(req);

    res.render('index', { successMessage, errorMessage });
  },

  // GET /books
  filterBooks: async (req, res) => {
    const { title, author, genre, publication_date } = req.query;

    const filters = {
      title: title || '',
      author: author || '',
      genre: genre || '',
      publication_date: publication_date || ''
    };

    try {
      // Filter the books
      const data = await bookService.filterBooks(filters);

      // Format the publication date
      const formattedBooks = data.map(book => ({
        ...book,
        publication_date: moment(book.publication_date).format('YYYY-MM-DD')
      }));

      // Get the messages from the flash
      const { successMessage, errorMessage } = getFlashMessages(req);

      return res.render('books', {
        books: formattedBooks,
        genres: genres,
        filters: filters,
        successMessage,
        errorMessage
      });
    } catch (err) {
      console.error(err);
      req.flash('error', 'An error occurred while fetching books.');
      return res.redirect('/');
    }
  },

  // GET /addBook
  getAddBook: (req, res) => {
    // Get the messages from the flash
    const { successMessage, errorMessage } = getFlashMessages(req);

    res.render('addBook', {
      genres: genres,
      successMessage,
      errorMessage
    });
  },

  // POST /addBook
  addBook: async (req, res) => {
    // Validate the request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Set error messages for each field
      const errorMessage = {};
      errors.array().forEach(error => {
        errorMessage[error.path] = error.msg;
      });

      // Render the addBook view with the error messages
      return res.status(400).render('addBook', {
        errors: errorMessage,
        bookData: req.body,
        genres: genres
      })
    }
    try {
      // Check if the ISBN is unique
      const isUnique = await bookService.isISBNUnique(req.body.isbn);
      if (!isUnique) {
        return res.status(400).render('addBook', {
          errors: { isbn: 'ISBN must be unique' },
          bookData: req.body,
          genres: genres
        });
      }

      // Add the book
      const newBook = req.body;
      await bookService.addBook(newBook);

      req.flash('success', 'Book added successfully');
      return res.redirect('/books');
    } catch (err) {
      console.error(err);
      req.flash('error', 'An error occurred while saving book.');
      return res.redirect('/');
    }
  },

  // GET /export
  exportBooks: async (req, res) => {
    const { format } = req.query;

    try {
       // Retrieve all books from the database
      const data = await bookService.getAllBooks();

      if (format === 'csv') {
        const csv = json2csv(data);
        res.header('Content-Type', 'text/csv');
        res.attachment('books.csv');
        res.send(csv);
      } else if (format === 'json') {
        res.header('Content-Type', 'application/json');
        res.attachment('books.json');
        res.send(JSON.stringify(data));
      } else {
        req.flash('error', 'Invalid format');
        return res.redirect('/books');
      }
    } catch (err) {
      console.error(err);
      req.flash('error', 'An error occurred while exporting books.');
      return res.redirect('/books');
    }
  },
};

// Export the book controller
module.exports = bookController;