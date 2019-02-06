'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);


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
                    expect(item).to.have.all.keys('_id', 'name', 'info');
                });
            });
    });
});