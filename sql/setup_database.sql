-- Create a new database
CREATE DATABASE IF NOT EXISTS BooksDB;

-- Select the database to use
USE BooksDB;

-- Create the inventory table
CREATE TABLE IF NOT EXISTS inventory(
  entry_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre ENUM('Fiction', 'Non-Fiction', 'Science', 'Biography', 'Fantasy', 'Mystery') DEFAULT 'Fiction',
  publication_date DATE NOT NULL,
  isbn VARCHAR(13) NOT NULL UNIQUE
);
