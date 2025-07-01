const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Book = require('../models/bookModel');
const auth = require('../middleware/auth');

// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/books/featured
// @desc    Get featured books
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const books = await Book.find({ featured: true });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/books/:id
// @desc    Get book by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    
    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/books
// @desc    Create a book
// @access  Private/Admin
router.post(
  '/',
  [
    auth.protect,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('author', 'Author is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('price', 'Please include a valid price').isNumeric(),
      check('category', 'Category is required').not().isEmpty(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      author,
      description,
      price,
      coverImage,
      category,
      countInStock,
      fileUrl
    } = req.body;

    try {
      const newBook = new Book({
        title,
        author,
        description,
        price,
        coverImage,
        category,
        countInStock: countInStock || 0,
        fileUrl
      });

      const book = await newBook.save();
      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/books/:id
// @desc    Update a book
// @access  Private/Admin
router.put(
  '/:id',
  auth.protect,
  async (req, res) => {
    const {
      title,
      author,
      description,
      price,
      coverImage,
      category,
      countInStock,
      featured,
      fileUrl
    } = req.body;

    // Build book object
    const bookFields = {};
    if (title) bookFields.title = title;
    if (author) bookFields.author = author;
    if (description) bookFields.description = description;
    if (price) bookFields.price = price;
    if (coverImage) bookFields.coverImage = coverImage;
    if (category) bookFields.category = category;
    if (countInStock) bookFields.countInStock = countInStock;
    if (featured !== undefined) bookFields.featured = featured;
    if (fileUrl) bookFields.fileUrl = fileUrl;

    try {
      let book = await Book.findById(req.params.id);

      if (!book) {
        return res.status(404).json({ msg: 'Book not found' });
      }

      book = await Book.findByIdAndUpdate(
        req.params.id,
        { $set: bookFields },
        { new: true }
      );

      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/books/:id
// @desc    Delete a book
// @access  Private/Admin
router.delete('/:id', auth.protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    await book.remove();

    res.json({ msg: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
