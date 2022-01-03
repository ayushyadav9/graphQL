const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})


const authorSchema = new Schema({
    name: String,
    age: Number
})


const Book = mongoose.model('Book',bookSchema)
const Author = mongoose.model('Author',authorSchema)


module.exports = {
    Book,Author
}

