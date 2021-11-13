const mongoose = require("mongoose");

//create book schema

const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    authors: [Number],
    en: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number
});

//create book model 

const BookModel = mongoose.model('books', BookSchema);

module.exports = BookModel;