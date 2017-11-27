

/**
* Number system converter supporting up to base62 (numbers 0-9, letters a-z and A-Z);
*/
const baseConverter = new function()
{
	const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	const self = this;

	/**
	* @function
	*
	* Convert a number from one base system to another
	* @param {int|string} value
	* @param {int} fromBase - The base system of the value
	* @param {int} toBase -  The base system to convert the value to
	*/
	this.convertBase = function convertBase(value, fromBase, toBase)
	{
		if(fromBase == toBase)
		{
			return value;
		}

		const valueAsDecimal = self.toBase10(value, fromBase);
		return self.base10To(valueAsDecimal, toBase);
	}

	/**
	* @function
	*
	* Convert a number to the base10(decimal) system
	* @param {int|string} value
	* @param {int} fromBase - The base system of the value
	* @returns {int}
	*/
	this.toBase10 = function toBase10(value, fromBase)
	{
		value = value.toString().split('').reverse();

		let decimalValue = value.reduce(function(accumulator, currentValue, currentIndex) {
			let currentValueAsDecimal = self.charToDecimal(currentValue);
			return accumulator + (Math.pow(fromBase, currentIndex) * currentValueAsDecimal);
		}, 0);

		return decimalValue;
	}

	/**
	* @function
	*
	* Convert a base10 number to another base
	* @param {int} value
	* @param {int} toBase - The base system to convert to
	* @returns {string}
	*/
	this.base10To = function base10To(decimalValue, toBase)
	{
		let baseValue = '';
		while(decimalValue > 0)
		{
			baseValue = self.decimalToChar(decimalValue % toBase) + baseValue;
			decimalValue = Math.floor(decimalValue / toBase);
		}

		return baseValue;

		/*
		* CAUTION: Math.floor(0.99999...) results in 1 instead of the expected 0
		*/
	}

	/**
	* @function
	*
	* Get the decimal value of a single character, regardless of the base system used.
	* The argument must be an number between 0 and 9 or a latin letter from a-z or A-Z.
	*
	* @returns {int}
	*/
	this.charToDecimal = function charToDecimal(character)
	{
		character = character.toString();
		return range.indexOf(character);
	}

	/**
	* @function
	*
	* Get the character representation of a decimal, regardless of the base system used.
	* The argument must be an int between 0 and 62 (both inclusive)
	*
	* @returns {string}
	*/
	this.decimalToChar = function decimalToChar(decimal)
	{
		return range[decimal]
	}

	/**
	* @function
	* Retruns the range of valid characters of a base system, in order.
	* @returns {string[]}
	*/
	this.getBaseCharRange = function getBaseCharRange(base)
	{
		return range.slice(0, base);
	}
}




/**
* Key system using the base36 number system.
* base36 uses decimals 0 - 1 and lowercase letters a - z.*
*/
const tinyKey = new function()
{
	const _keyBase = 36;
	const _charRange = baseConverter.getBaseCharRange(_keyBase);

	/**
	* @function
	*
	* Return a key incramented by 1 i.e. the next key after a given key.
	* @param {int|string} previousKey - Key to incrament.
	* @returns {string}
	*/
	this.incrementKey = function incrementKey(previousKey)
	{
		let previousDecimal = baseConverter.toBase10(previousKey, _keyBase);
		let nextDecimal = previousDecimal + 1;

		return baseConverter.base10To(nextDecimal, _keyBase);
	}

	/**
	* @function
	*
	* Converts a key to an integer.
	* @param {int|string} key 
	* @returns {int}
	*/
	this.keyToInt = function keyToInt(key)
	{
		if(typeof key == 'number' && key <= 9)
		{
			return key;
		}
		
		return baseConverter.toBase10(key, _keyBase);
	}

	/**
	* @function
	*
	* Return if a key is valid or not.
	* An invalid key is one that contains characters outside the base36 number system.
	* @param {int|string} key
	* @returns {bool}
	*/
	this.isKeyValid = function isKeyValid(key)
	{
		key = key.toString().split('');
		for(let keyChar of key)
		{
			if(_charRange.indexOf(keyChar) == -1)
			{
				return false;
			}
		}

		return true;
	}

	
	/**
	* @function
	* @private
	* Random int between a min (inclusive) and max (inclusive)
	*/
	function randomInt(min=0, max=100)
	{
		return Math.floor(Math.random() * (max - min + 1) ) + min
	}
	
	
	/**
	* @function
	* Generate a random key, optional between a minimum key value maximum key value (both inclusive)
	*
	* @param {int|string=} minKeyValue - (optional) minimum key value in base36 numbering system
	* @param {int|string=} maxKeyValue - (optional) maximum key value in base36 numbering system
	* @returns {string} - Random value in the base36 numbering system
	*/
	this.randomKey = function randomKey(minKeyValue='0', maxKeyValue='zzzzz')
	{
		const minInt = baseConverter.toBase10(minKeyValue, _keyBase);
		const maxInt = baseConverter.toBase10(maxKeyValue, _keyBase);

		const randomKeyInt = randomInt(minInt, maxInt);

		return baseConverter.base10To(randomKeyInt, _keyBase);
	}



	/**
	* Return the number system beaing used by TineKey (base 36 number system)
	*/
	this.getBaseSystem = function getBaseSystem()
	{
		return _keyBase;
	}

}






module.exports = tinyKey;


