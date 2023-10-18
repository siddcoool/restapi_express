const books = require("./books.json")
const express = require('express');
const app = express();
const port = 4000;
const fs = require('fs');

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    for (let a = 0; a < books.length; a++) {
        if (books[a].id === parseInt(id)) {
            return res.status(200).json({ "data": books[a] })
        }
    }
    res.status(404).json({
        "error": "not found"
    })

});
app.use(express.json());
app.post('/books', (req, res) => {
    let name = req.body.name
    let price = req.body.price

    const newBook = {
        id: books[books.length - 1].id + 1,
        name: name,
        price: price
    };
    const data = fs.readFileSync('books.json');
    const Book = JSON.parse(data);

    Book.push(newBook);
    const newData = JSON.stringify(Book);

    fs.writeFile('books.json', newData, err => {
        // error checking
        if (err) res.status(500).send({
            "err": err.message
        });

        console.log("New data added");
        res.json(newBook);
    });



})
app.delete('/books/:id', (req, res) => {

    const data = fs.readFileSync('books.json');
    const Books = JSON.parse(data);

    const id = req.params.id;
    let found = false;
    for (let a = 0; a < Books.length; a++) {
        if (Books[a].id === parseInt(id)) {
            found = true;
        }
        if (found) {
            Books[a] = Books[a + 1]
        }

    }
    if (found) {
        Books.pop();

    }
    else {
        return res.status(404).json({ message: 'Item not found' });
    }

    const newData = JSON.stringify(Books);

    fs.writeFile('books.json', newData, err => {
        // error checking
        if (err) res.status(500).send({
            "err": err.message
        });

        res.status(200).send(
            { "message": "Deleted" }
        )

    });
})

app.put('/books/:id', (req, res) => {
    let name = req.body.name
    let price = req.body.price
    const data = fs.readFileSync('books.json')
    const books = JSON.parse(data)
    const id = req.params.id

    let found = false;
   for(let i = 0 ; i < books.length; i++){
        if(books[i].id === parseInt(id)){
            books[i].name = name
            books[i].price = price
            found = true;
    }
}
if(!found){
    return res.status(404).json({ message: 'Item not found' })
}
    
    const newData = JSON.stringify(books);

    fs.writeFile('books.json', newData, err => {
        // error checking
        if (err) res.status(500).send({
            "err": err.message
        });

        console.log("New data added");
        res.json(books);
    });

})
// app.listen(3000, ()=>console.log('Server is running on port 3000'))
