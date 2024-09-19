-- Select the database to use
USE BooksDB;

-- Insert some data
INSERT INTO inventory (title, author, genre, publication_date, isbn)
VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '1925-04-10', '9780743273565'),
('To Kill a Mockingbird', 'Harper Lee', 'Fiction', '1960-07-11', '9780060935467'),
('A Brief History of Time', 'Stephen Hawking', 'Science', '1988-03-01', '9780553380163');