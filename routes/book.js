const express = require('express');
const Book = require('../models/book');
const Author = require("../models/author")
const app = express.Router();


app.get('/', async (req, res) => {
    let books = await Book.find()
    res.json(books)
});

app.get('/:id', async (req, res) => {
    //return res.json(await Book.findById(req.params.id).populate('authorId'))
    const id = req.params.id;
    let book = await Book.findById(id).populate("authorId")
    
   // const author = await Author.findById(book.authorId)
    res.json({book})
});

app.post('/', async (req, res) => {
    let name = req.body.name
    let price = req.body.price

    const newBook = {
        name: name,
        price: price
    };
    await Book.create(newBook)
    res.status(201).json({ message: 'User saved successfully' });

})

app.post("/authors/:authorId", async (req, res) => {
    const { authorId } = req.params
    const name = req.body.name
    const price = req.body.price

    const newBook = {
        name,
        price,
        authorId
    }
    await Book.create(newBook)
    res.status(201).json({ message: "user saved sucesffully" })
})



app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    let book = await Book.findByIdAndDelete(id)
    res.json(book)
})

app.put('/:id', async (req, res) => {
    let name = req.body.name
    let price = req.body.price
    const id = req.params.id
    const book = await Book.findByIdAndUpdate(id, {
        name, price
    })
    res.json(book)
})

app.put("/:booksId/authors/:authorId", async (req,res)=>{
    const {booksId,authorId} = req.params   
     const book = await Book.findByIdAndUpdate(booksId,{
        authorId
     })
    res.json(book)
})



module.exports = app;