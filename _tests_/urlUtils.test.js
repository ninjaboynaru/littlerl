const expect = require('chai').expect;
const UrlUtils = require('../api/UrlUtils.js');


describe('UrlUtils tests', function(){
	it('UrlUtils correctly gets protocol from urls', function(){

		expect(UrlUtils.getProtocol('http://google.com') ).to.equal('http');
		expect(UrlUtils.getProtocol('http://ftp://apple.com') ).to.equal('http');
		expect(UrlUtils.getProtocol('fakeProto://www.samsmith.com/https') ).to.equal('fakeProto');
		expect(UrlUtils.getProtocol('FTP://www.com') ).to.equal('FTP');
		expect(UrlUtils.getProtocol('www.snakeio.com') ).to.not.exist;
		expect(UrlUtils.getProtocol('://www.snakeio.com') ).to.not.exist;
	});

	it('UrlUtils corectly determines if urls are valid or not', function(){

		expect(UrlUtils.isUrlValid('www.google.com') ).to.be.true;
		expect(UrlUtils.isUrlValid('www.eatery.jp/shop/?search=sauce&limit=12') ).to.be.true;
		expect(UrlUtils.isUrlValid('http://www.eaby.com.uk/cloths/?search=red%20coats') ).to.be.true;
		expect(UrlUtils.isUrlValid('HTTPS://shopio.com') ).to.be.true;

		expect(UrlUtils.isUrlValid('http://urlshort.com/api/create/?url=http://www.google.com/?search=laptop') ).to.be.true;
		expect(UrlUtils.isUrlValid('FTP://www.urlshort.com/api/create/?url=http://www.google.com/?search=laptop') ).to.be.true;
		expect(UrlUtils.isUrlValid('www.urlShort.com/api/create/?url=http://www.google.com/?search=laptop') ).to.be.true;

		expect(UrlUtils.isUrlValid('urlshort.com/api/create/?url=http://www.google.com/?search=laptop') ).to.be.false;

		expect(UrlUtils.isUrlValid('playio.com') ).to.be.false;
		expect(UrlUtils.isUrlValid('badprotocol://www.playio.com') ).to.be.false;
		expect(UrlUtils.isUrlValid('fakeProto://www.playio.com') ).to.be.false;
		expect(UrlUtils.isUrlValid('fakeProto://playio.com') ).to.be.false;
		expect(UrlUtils.isUrlValid('playio.com/http://') ).to.be.false;
		expect(UrlUtils.isUrlValid('www.youtube') ).to.be.false;
		expect(UrlUtils.isUrlValid('www.youtube/account/?operation=censor') ).to.be.false;

	});

	it('UrlUtils correctly appends protocol to start of string', function(){

		expect(UrlUtils.appendProtocol('urlString', 'http') ).to.equal('http://urlString');
		expect(UrlUtils.appendProtocol('www.io.com', 'FTP') ).to.equal('FTP://www.io.com');
		expect(UrlUtils.appendProtocol('weare.edu.uk', 'fakePROTO') ).to.equal('fakePROTO://weare.edu.uk');

	});


	it('UrlUtils correctly standardizes url', function(){

		expect(UrlUtils.standardizeUrl('www.regular.com')).to.equal('www.regular.com/');
		expect(UrlUtils.standardizeUrl('www.rEguLAr.com')).to.equal('www.regular.com/');
		expect(UrlUtils.standardizeUrl('www.google.com/APPLE')).to.equal('www.google.com/APPLE');
		expect(UrlUtils.standardizeUrl('https://WWW.google.com/APPLE')).to.equal('https://www.google.com/APPLE');
		expect(UrlUtils.standardizeUrl('ftp://www.tEst.com/APPLE/?query=AbC')).to.equal('ftp://www.test.com/APPLE/?query=AbC');
		expect(UrlUtils.standardizeUrl('www.Website.com')).to.equal('www.website.com/');


	});

});




