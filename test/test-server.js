'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
const {Recipe} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

function seedRecipeData(){
    const seedData = [];
    for(let i = 1; i < 5; i++){
        seedData.push(generateRecipeData());
    }
    return Recipe.insertMany(seedData);
}

function generateRecipeData(){
    return {
        __v: 0,
        name: faker.lorem.words(),
        info: faker.lorem.sentence(),
        ingredients: [faker.lorem.word(), faker.lorem.word()],
        directions: [faker.lorem.words(), faker.lorem.words()]
    };
}

function tearDownDb(){
    return mongoose.connection.dropDatabase();
}

describe('Recipes API resource', function(){
    before(function(){
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function(){
        return seedRecipeData();
    });
    afterEach(function(){
        return tearDownDb();
    });
    after(function(){
        return closeServer();
    });

    describe('index page', function(){
        it('should exist', function(){
            return chai.request(app)
                .get('/')
                .then(function(res){
                    expect(res).to.have.status(200);
                });
        });
    });

    describe('recipes', function(){
        it('should list recipes on GET', function(){
            return chai.request(app)
                .get('/recipes')
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.be.above(0);
                    res.body.forEach(function(item){
                        expect(item).to.be.a('object');
                        expect(item).to.have.all.keys('__v', '_id', 'name', 'info', 'ingredients', 'directions');
                    });
                });
        });

        it('should add item on POST', function(){
            const newItem = generateRecipeData();

            return chai.request(app)
                .post('/recipes')
                .send(newItem)
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.all.keys('__v', '_id', 'name', 'info', 'ingredients', 'directions');
                    expect(res.body._id).to.not.equal(null);
                    expect(res.body).to.deep.equal(Object.assign(newItem, {_id: res.body._id}));
                });
        });
    });
});