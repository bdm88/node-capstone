const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/recipes';
const PORT = process.env.PORT || 8080;

mongoose.connect(DATABASE_URL, app.listen(PORT));

const Recipe = mongoose.model('Recipe', {
    name: String,
    info: String
})

app.get('/recipes', (request, response) =>{
    Recipe.find().then(data =>{
        response.json(data)
    })
})

module.exports = app;