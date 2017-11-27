const expect = require('chai').expect;
const tinyKey = require('../api/tinyKey.js');


describe('TinyKey tests', function(){
	it('tinyKey increments keys correctly', function() {
		expect(tinyKey.incrementKey(1) ).to.equal('2');
		expect(tinyKey.incrementKey(9) ).to.equal('a');
		expect(tinyKey.incrementKey('z') ).to.equal('10');
		expect(tinyKey.incrementKey('12azd') ).to.equal('12aze');
		expect(tinyKey.incrementKey('zzz') ).to.equal('1000');
	});

	it('tinyKey converts keys to ints', function() {
		expect(tinyKey.keyToInt(1) ).to.equal(1);
		expect(tinyKey.keyToInt(14) ).to.equal(40);
		expect(tinyKey.keyToInt('zz') ).to.equal(1295);
		expect(tinyKey.keyToInt('12azd') ).to.equal(1787161);
	});


	it('tinyKey checks key validility', function() {
		expect(tinyKey.isKeyValid(1) ).to.equal(true);
		expect(tinyKey.isKeyValid('2') ).to.equal(true);
		expect(tinyKey.isKeyValid('az12d') ).to.equal(true);
		expect(tinyKey.isKeyValid('azA12') ).to.equal(false);
		expect(tinyKey.isKeyValid('-12+AB') ).to.equal(false);
	});


	it('tinyKey generates random keys', function() {
		const firstKey = tinyKey.randomKey();
		const secondKey = tinyKey.randomKey();

		expect(firstKey).to.not.equal(secondKey);
	});

	it('tinyKey base/radix system is 36', function() {
		expect(tinyKey.getBaseSystem() ).to.equal(36);
	});

});



