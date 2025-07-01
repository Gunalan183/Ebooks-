const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be at least 0']
  },
  coverImage: {
    type: String,
    required: [true, 'Please add a cover image']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Fiction',
      'Non-Fiction',
      'Science Fiction',
      'Fantasy',
      'Mystery',
      'Thriller',
      'Romance',
      'Biography',
      'Self-Help',
      'Other'
    ]
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  fileUrl: {
    type: String,
    required: [true, 'Please add an eBook file']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', bookSchema);
