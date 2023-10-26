const express = require('express');
const Author = require('../models/author');
const router = express.Router();



router.get('/', (req, res) => {
  const authors = Author.find()
  res.send(authors);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id
  let author = await Author.findById(id)
  res.json(author)
})

router.post("/", async (req, res) => {
  await Author.create(req.body)
  res.json({ message: 'User saved successfully' });
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  let author = await Author.findByIdAndDelete(id)
  res.json(author)

})

router.put("/:id", async (req,res)=>{
  const{id} = req.params
  const { authorName, publicationRank, publications } = req.body;

  const newEntry = {
    authorName,
    publicationRank,
    publications
  }
  const author = await Author.findByIdAndUpdate(id, newEntry)
  res.json(author)
  
})

                                                                                              
