const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

mongoose.connect('mongodb://localhost:27017/recipes', {useNewUrlParser: true});

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