const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    // Add more fields as needed
    name: String,
    price: Number,
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'author' }
});


const Book = mongoose.model('book', bookSchema);
                                                                                                                                   
module.exports = Book;
