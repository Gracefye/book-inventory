// Description: This file is the entry point for the application
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const bookRoutes = require('./routes/bookRoutes');
const db = require('./config/db');
const port = 3000;

// Use the express-session to manage sessions
app.use(session({
  secret: 'book_inventory_management',
  resave: false,
  saveUninitialized: true,
}));

// Use the flash to pass messages
app.use(flash());

// Set the view engine
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Use the express.json() middleware
app.use(express.json());

// Parse url-encoded body
app.use(express.urlencoded({ extended: false }));

// Set the path to the views folder
app.set('views', path.join(__dirname, 'views'));

// Set the path to the node_modules folder
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Use the bookRoutes
app.use('/', bookRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});