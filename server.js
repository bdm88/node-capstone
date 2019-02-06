const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const uuid = require('uuid');

const app = express();

app.use(cors());
app.use(express.static('public'));

const {PORT, DATABASE_URL} = require('./config');

mongoose.connect(DATABASE_URL, app.listen(PORT));

const Recipe = mongoose.model('Recipe', {
    name: String,
    info: String
})

app.get('/recipes', (req, res) =>{
    Recipe.find().then(data =>{
        res.json(data)
    })
})

module.exports = app;