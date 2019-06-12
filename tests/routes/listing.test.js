// Mongoose and mocking requests
const sinon = require('sinon');

const mongoose = require('mongoose')
require('sinon-mongoose')

// initialize the app and models
const app = require('../../index.js')

// sending requests
const agent = require('supertest').agent(app);
// validating results
const expect = require('chai').expect;

// get the model
const Listing = mongoose.model('Listing')

var listingMock = sinon.mock(Listing)

beforeEach(() => {
	listingMock.restore();
// Unwraps the spy
});

afterEach( () => {
	listingMock.verify();

});



describe('Listing Integration tests', () => {

	// Our test data
	const expected = {
		"_id": "5cecf112a66bc43a217dfda3",
		"address": {
			"streetName": "storgatan",
			"streetNumber": "48C",
			"city": "Hovmantorp",
			"coordinate": {
				"lat": 10,
				"lng": 20
			}
		},
		"typeSummary": "apartment",
		"price": 200000,
		"monthlyFee": 5000,
		"bidding": false,
		"__v": 0

	}

	describe('listings.get', ()  => {
		it('Should return an array of all listings', (done) => {

			// Given (preconditions)
			listingMock
			.expects('find')
			.chain('exec')
			.resolves([expected]);

			// When (someting happens)
			agent
			.get('/listings')
			.end((err,res) => {
			// Then (something should happen)
				expect(res.status).to.equal(200);
				expect(res.body).to.eql([expected]);
				done();
			});
		});

		it('Should get a listing by id', (done) => {

			// Given (preconditions)
		listingMock
			.expects('findById')
			.withArgs("5cecf112a66bc43a217dfda3")
			.chain('exec')
			.resolves(expected);

			// When (someting happens)
			agent
			.get('/listings/5cecf112a66bc43a217dfda3')
			.end((err,res) => {
			// Then (something should happen)
				expect(res.status).to.equal(200);
				expect(res.body).to.eql(expected);
				done();
			});
		});


	describe('listings.post', ()  => {
		it('Should be able to create a listing', (done) => {
			// Given (preconditions)
		listingMock
			.expects('create')
			.withArgs({
				"address": {
					"streetName": "storgatan",
					"streetNumber": "48C",
					"city": "Hovmantorp",
					"coordinate": {
						"lat": 10,
						"lng": 20
					}
				},
			"typeSummary": "apartment",
			"price": 200000,
			"monthlyFee": 5000,
			"bidding": false
		})
			.chain('exec')
			.resolves(expected);

			// When (someting happens)
			agent
			.post('/listings/')
			.send(expected)
			.end((err,res) => {
			// Then (something should happen)
				expect(res.status).to.equal(201);
				expect(res.body).to.eql(expected);
				done();
			});
		});
	})


	describe('listings.deleteListing', ()  => {
		it('Should be able to delete a listing', (done) => {
			// Given (preconditions)
		listingMock
			.expects('findByIdAndDelete')
			.withArgs("5cecf112a66bc43a217dfda3")
			.chain('exec')
			.resolves(expected);

			// When (someting happens)
			agent
			.delete('/listings/5cecf112a66bc43a217dfda3')
			.send(expected)
			.end((err,res) => {
			// Then (something should happen)
				expect(res.status).to.equal(200);
				done();
			});
		});
		});
	 })
});
