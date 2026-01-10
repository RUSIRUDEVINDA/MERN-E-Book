import Book from "../models/Book.js";  // Added .js extension to fix the import error

//@desc Create a new book
//@route POST/api/books
//@access Private

const createBook = async (req, res) => {  // Corrected parameter order (req first, then res)
    try {
        const { title, author, subtitle, chapters } = req.body;
        if (!title || !author) {
            return res.status(400).json({ message: "Please provide a title and author" });
        }
        const book = await Book.create({  // Changed to Book.create() to properly save the document
            userId: req.user._id,  // Corrected to req.user._id (assuming _id is the property from MongoDB)
            title,
            author,
            subtitle,
            chapters
        });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc Get all books for a user
// @route GET/api/books
//@access Private
const getBook = async (req, res) => {  // Corrected parameter order
    try {
        const books = await Book.find({ userId: req.user._id }).sort({ createdAt: -1 });  // Corrected to req.user._id
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

//@desc Get a single book ID
//@route GET/api/books/:id
//@access Private
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (book.userId.toString() !== req.user._id.toString()) {  // Corrected to req.user._id
            return res.status(401).json({ message: "Not authorized to view this book" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

//@desc update a book
//@route PUT/api/books/:id
//@access Private
const updateBook = async (req, res) => {
    try {
        console.log('Update request body:', req.body);
        console.log('Book ID:', req.params.id);
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (book.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this book" });
        }
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        console.log('Updated book:', updatedBook);
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: "Server Error" });
    }
};

//@desc Delete a book
//@route DELETE/api/books/:id
//@access Private
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (book.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this book" });
        }

        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

//@desc Update a book's cover image
//@route PUT/api/books/cover/:id
//@access Private
const updateBookCover = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (book.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this book" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        book.coverImage = req.file.filename;
        await book.save();

        res.status(200).json({ message: "Cover image updated successfully", coverImage: book.coverImage });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export { createBook, getBook, getBookById, updateBook, deleteBook, updateBookCover };