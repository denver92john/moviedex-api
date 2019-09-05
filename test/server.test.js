const app = require('../server');
const expect = require('chai').expect;
const request = require('supertest');

describe('validateToken middleware function', () => {
    it('authToken should be present', () => {
        //
    });

    it('authToken and apiToken should be equal', () => {
        //
    });
});

describe('GET /movie endpoint', () => {
    it('genre query parameter of "Action"', () => {
        return request(app)
            .get('/movie')
            .query({genre: 'Action'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
            });
    });
});