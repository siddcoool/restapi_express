const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema(
    {
        authorName : String,
        publicationRank: Number,
        publications: [{
            publicationName : String,
            publicationStartDate : Date
        }]
    }
)

const Author = mongoose.model("author", authorSchema)

module.exports = Author;