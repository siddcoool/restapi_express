require("./db")
const books = require("./books.json")
const express = require('express');
const app = express();
const port = 4000;
const fs = require('fs');
const authorRoutes = require("./routes/author")
const bookRoutes = require("./routes/book")


app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

app.use('/authors', authorRoutes)
app.use("/books", bookRoutes)



// app.listen(3000, ()=>console.log('Server is running on port 3000'))
