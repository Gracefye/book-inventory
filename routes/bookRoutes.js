const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const bookController = require('../controllers/bookController');
const validGenres = require('../config/genres');

// GET /
router.get('/', bookController.getHome);

// GET /books
router.get('/books', bookController.filterBooks);

// GET /addBook
router.get('/addBook', bookController.getAddBook);

// POST /addBook
router.post('/addBook', [
  check('title').trim().notEmpty().withMessage('Title is required'),
  check('author').trim().notEmpty().withMessage('Author is required'),
  check('genre').custom(value => {
    if (!validGenres.includes(value)) {
      throw new Error('Invalid genre.');
    }
    return true;
  }),
  check('publication_date').trim().isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Publication Date must be in YYYY-MM-DD format'),
  check('isbn').trim().notEmpty().withMessage('ISBN is required')
    .matches(/^(?:\d{9}[\dXx]|\d{13})$/)
    .withMessage('ISBN must be a valid ISBN-10 or ISBN-13 format'),
], bookController.addBook);

// GET /export
router.get('/export', bookController.exportBooks);

module.exports = router;