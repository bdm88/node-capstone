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

const Recipe = mongoose.model('Recipe', {
    name: String,
    info: String,
    ingredients: [String],
    directions: [String]
})

app.get('/recipes', (req, res) =>{
    Recipe.find().then(data =>{
        res.json(data)
    })
})

app.post('/recipes', jsonParser, (req, res) =>{
    const requiredFields = ['name', 'info', 'ingredients', 'directions'];
    for(let i = 0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if (!(field in req.body)){
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    Recipe.create({
        name: req.body.name,
        info: req.body.info,
        ingredients: req.body.ingredients,
        directions: req.body.directions
    })
    .then(recipe =>{
        res.status(201).json(recipe);
    }
    )
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    });
});

app.delete('/recipes/:id', (req, res) =>{
    Recipe.findByIdAndRemove(req.params.id)
    .then(() =>{
        res.status(204).json({message: 'success'});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    });
});

app.put('/recipes/:id', (req, res) =>{
    if(!(req.params.id && req.body._id && req.params.id === req.body._id)){
        res.status(400).json({
            error: 'Request path id and body id values must match.'
        });
    }
    const updated = {};
    const updateableFields = ['name', 'info', 'ingredients', 'directions'];
    updateableFields.forEach(field =>{
        if(field in req.body){
            update[field] = req.body[field];
        }
    });
    Recipe.findOneAndUpdate(req.params.id, {$set: updated}, {new: true})
        .then(updatedRecipe => res.status(204).end())
        .catch(err => res.status(500).json({error: 'Internal server error'}));
});

let server;

function runServer(databaseUrl, port = PORT){
    return new Promise((resolve, reject) =>{
        mongoose.connect(databaseUrl, err =>{
            if(err){
                return reject(err);
            }
            server = app.listen(port, () =>{
                resolve();
            })
            .on('error', err =>{
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

function closeServer(){
    return mongoose.disconnect()
        .then(() =>{
            return new Promise((resolve, reject) =>{
                server.close(err => {
                    if(err){
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
}

if(require.main === module){
    runServer(DATABASE_URL).catch(err => console(err));
}

module.exports = {app, runServer, closeServer, Recipe};