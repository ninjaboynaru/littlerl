const chai = require ('chai');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

const app = require('../api/app.js');
const urlUtils = require('../api/urlUtils.js');
const UrlDatabase = require('../api/urlDatabase.js');
const mongoConfig = require('../config/mongoConfig.json');

chai.use(chaiHttp);
chai.use(sinonChai);


const urlDatabase = new UrlDatabase();


function randomString(stringSize=10) {
	const charRange = 'ABCDEFGHIJKLMNOPQRSTUVQXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
	let text = '';

	for (let i = 0; i < stringSize; i++)
	{
		text += charRange[Math.floor(Math.random() * charRange.length)];
	}
	return text;
}


describe('UrlDatabase object initialization', function(){
	it('UrlDatabase initializes to testing uri and calls callback correctly', function(done){
		const testUri = mongoConfig.testingUri;
		urlDatabase.init(testUri, function(error, mongoDb, urlDb){
			expect(error).to.not.exist;
			expect(mongoDb).to.exist;
			expect(mongoDb).to.be.a('object');
			expect(urlDb).to.equal(urlDatabase);
			done();
		});
	});
});

function validateApiResponse_create(error, response, urlQuery)
{
	expect(error).to.not.exist;
	expect(response).to.have.status(200);
	expect(response).to.be.json;

	expect(response.body).to.have.own.property('query', urlUtils.standardizeUrl(urlQuery) );
	expect(response.body).to.have.own.property('urlEntry');

	expect(response.body.urlEntry).to.include.all.keys('url', 'key', 'keyAsInt');
	expect(response.body.urlEntry.url ).to.equal(urlUtils.standardizeUrl(urlQuery) );	
}

describe('App "Create" method', function(){

	it('Can post request to create a new shortened url and get back proper response', function(done){
		const fakeDomain = randomString(12);
		const urlQuery = `www.${fakeDomain}.com`;
		const postUri = `/api/create/?url=${urlQuery}`;

		app.urlDatabase = urlDatabase;
		chai.request(app).post(postUri).end(function(error, response){
			validateApiResponse_create(error, response, urlQuery)
			done();
		});
	});

	it('Can post 2 "create" requests, the second one with a key +1 greater than the first', function(done){
		const fakeDomain1 = randomString(12);
		const fakeDomain2 = randomString(12);
		const urlQuery1 = `http://www.${fakeDomain1}.com`;
		const urlQuery2 = `www.${fakeDomain2}.com/page/?key=paramA12`;
		const postUri1 = `/api/create/?url=${urlQuery1}`;
		const postUri2 = `/api/create/?url=${urlQuery2}`;

		let fistResponseKey;
		let secondResponseKey;

		app.urlDatabase = urlDatabase;
		let server = chai.request(app).post(postUri1).end(function(error1, response1){
			validateApiResponse_create(error1, response1, urlQuery1);
			fistResponseKey = response1.body.urlEntry.keyAsInt;

			// force the database to restart and find the last inserted url
			server.app.close();

			chai.request(app).post(postUri2).end(function(error2, response2){
				validateApiResponse_create(error2, response2, urlQuery2);
				secondResponseKey = response2.body.urlEntry.keyAsInt;

				expect(secondResponseKey).to.equal(fistResponseKey + 1);
				done();
			});

		});
	});

	it('Posting a "create" request with an invalid url query gives back an error', function(done){
		const fakeDomain = randomString(12);
		const badUrlQuery = `${fakeDomain}.com`;
		const postUri = `/api/create/?url=${badUrlQuery}`;

		app.urlDatabase = urlDatabase;
		chai.request(app).post(postUri).end(function(error, response){
			expect(error).to.exist;

			expect(response).to.not.have.status(200);
			expect(response).to.be.json;

			expect(response.body).to.have.own.property('query', badUrlQuery);
			expect(response.body).to.include.all.keys('error', 'description');
			expect(response.body.error).to.exist;
			expect(response.body.description).to.exist;

			done();
		});
	});

	it('Posting a duplicate "create" response returns the same response', function(done){
		const fakeDomain = randomString(12);
		const urlQuery = `https://www.${fakeDomain}.com/page/?query=value`;
		const postUri = `/api/create/?url=${urlQuery}`;

		let firstResponse;
		let secondResponse;

		app.urlDatabase = urlDatabase;
		chai.request(app).post(postUri).end(function(error1, response1){
			validateApiResponse_create(error1, response1, urlQuery);
			firstResponse = response1.body;

			chai.request(app).post(postUri).end(function(error2, response2){
				validateApiResponse_create(error2, response2, urlQuery);
				secondResponse = response2.body;

				expect(secondResponse).to.deep.equal(firstResponse);
				done();
			});
		});
	});


});


describe('App redirects', function(){

	it('Can post "create" request and then visit/redirect to that created url', function(done){
		const fakeDomain = randomString(12);
		const urlQuery = `http://www.${fakeDomain}.com/JnLn/?=TO`;
		const postUri = `/api/create/?url=${urlQuery}`;

		let createResponse;

		chai.request(app).post(postUri).end(function(error1, response1){
			validateApiResponse_create(error1, response1, urlQuery);
			createResponse = response1.body;

			chai.request(app).get(`/a/${createResponse.urlEntry.key}`).end(function(error2, response2){
				expect(response2).to.redirect;
				expect(response2).to.redirectTo(createResponse.urlEntry.url);

				done();

			});

		});
	});

});



after(function(){
	//app.close();
});








