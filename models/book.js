const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    // Add more fields as needed
    name: String,
    price: Number,
    authorId: mongoose.Types.ObjectId
});


const Book = mongoose.model('book', bookSchema);
                                                                                                                                   
module.exports = Book;
