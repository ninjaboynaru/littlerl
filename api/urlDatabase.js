const mongo = require('mongodb').MongoClient;
const tinyKey = require('./tinyKey.js');



/**
* @typedef {object} UrlEntry
* @property {string} key - Base36 key of that entry
* @property {int} keyAsInt - The key represented as a base10 integer
* @property {string} url
*
* @description - A URL document within the database
*/


/**
* @class
* Mongo database manager for URLs, each identified by, and stored alongside, a unique base36 key
* that can be used for URL shortening services.
*
* If the constructor is called with a mongoDB uri string and a callback function, the the Init() function is invoked.
*
* The key of each URL document added to the database is 1 more than the previous URL document added.
* Thus, the first URL document added will have a key of 0, and the second
* will have a key of 1, 11th a key of "a", 36th a key of "y", etc...
*
* This ensures that each URL has a unique and small key that can be used to identify it with URL shortening services.
*/
const UrlDatabase = function(dbUri, connectCallback)
{
	const _self = this;

	let _database;
	let _urlsCollection;
	let _lastUrlCreated;

	/**
	* @function
	* @private
	*/
	function _CopyObj(objToCopy)
	{
		if(typeof objToCopy != 'object')
		{
			return objToCopy;
		}
		return Object.assign({}, objToCopy);
	}

	/**
	* @function
	* @public
	* Initialize the UrlDatabase and connect to a mongo database.
	* Call this method again to re-initalize and connect to a different database.
	*
	* @param {string} databseUri - The mongodb URI.
	* @param {function} callback - Callback to handle the connection results.
	*
	* The callback is invoked as "callback(error, mongoDatabase, urlDatabase)"
	* - error will either be null or an error returned by the mongo js driver.
	* - mongoDatabase will either be null or the database returned by the connection.
	* - urlDatabase will either be null or the UrlDatabase object on wich Init() was called, i.e. ".this"
	*/
	this.init = function Init(databseUri, callback)
	{
		_database = undefined;
		_urlsCollection = undefined;
		_lastUrlCreated = undefined;

		mongo.connect(databseUri, onConnect);

		function onConnect(error, database)
		{
			if(error)
			{
				callback(error, null, null);
				return;
			}

			_database = database;
			_urlsCollection = _database.collection('keys');
			_self.getLastUrlCreated(onLastUrlObtained);
		}

		function onLastUrlObtained(error, urlDocument)
		{
			if(error)
			{
				callback('Database initialized but failed to obtain the last url entry created. findOne() error: ' + error, null, null);
				return;
			}
			if(urlDocument != undefined)
			{
				_lastUrlCreated = urlDocument;
			}

			callback(null, _database, _self);
		}
	}


	/**
	* @function
	* @public
	* Create a new URL in the database.
	* If the URL already exists in the database, the existing URL entr will be returned.
	* Note that no form of URL validation is performed.
	*
	* @param {string} URL - The mongodb uri.
	* @param {function} callback - Callback to handle the operation result or error.
	*
	* The callback is invoked as "callback(error, urlEntry, alreadyExists)"
	* - error will either be undefined or an error returned by the mongo js driver.
	* - urlEntry is a {UrlEntry} and represents the document inserted in the database. It may be undefined if an error occured.
	* - alreadyExists is a bool or undefined, and is true if the URL to create already existed in the database.
	*/
	this.createUrlEntry = function createUrlEntry(url, callback)
	{
		if(_database == undefined)
		{
			callback('UrlDatabase has not been initialized with a databse. Unable to create a new url entry', null);
			return;
		}

		let nextKey = '0';
		let nextKeyAsInt = 0;
		if(_lastUrlCreated != undefined)
		{
			nextKey = tinyKey.incrementKey(_lastUrlCreated.key);
			nextKeyAsInt = tinyKey.keyToInt(nextKey);
		}

		let newEntry = {url:url, key:nextKey, keyAsInt:nextKeyAsInt};

		_self.getUrlInfo({url:url}, function(error, urlDocument){
			if(error)
			{
				const errorMessage = 'Unabel to determine if the givin url already exists in the database. find() error: ' + error;
				callback(errorMessage, null);
				return;
			}
			else if(urlDocument != undefined)
			{
				callback(null, urlDocument, true);
				return;
			}

			performCreation();
		});

		const performCreation = ()=> {
			_urlsCollection.insertOne(newEntry, function(error, insertResult){
				if(error)
				{
					callback(error, null);
					return;
				}

				const entryWithoutId = insertResult.ops[0];
				entryWithoutId._id = undefined;

				_lastUrlCreated = entryWithoutId;
				callback(null, _CopyObj(entryWithoutId) );
			});
		}
		}

	/**
	* @function
	* @public
	* Get a URL from the database.
	*
	* @param {object} searchOption - What field to search the database by.
	* @param {string} searchOption.key - If defined, will find a URL entry with this key.
	* @param {string} searchOption.url - If defined, will find a URL entry with this URL.
	*
	* @param {function} callback - Callback to handle the operation result or error.
	*
	* The callback is invoked as "callback(error, urlEntry)"
	* - error will either be undefined or an error returned by the mongo js driver.
	* - urlEntry is a {UrlEntry} and represents the document retrieved from the database.
	*	It may be undefined if an error occurred, or no URL was found.
	*/
	this.getUrlInfo = function getUrlInfo(searchOption, callback)
	{
		if(_database == undefined)
		{
			callback('UrlDatabase has not been initialized with a database. Unable to get url info', null);
			return;
		}


		let findQuery;
		if(searchOption.key)
		{
			findQuery = {key:searchOption.key.toString()}
			if(_lastUrlCreated != undefined && tinyKey.keyToInt(findQuery) > _lastUrlCreated.keyAsInt)
			{
				callback(null, null);
				return;
			}
		}
		else if(searchOption.url)
		{
			findQuery = {url:searchOption.url}
		}


		_urlsCollection.findOne(findQuery, {fields:{_id:false}}, function(error, urlDocument){
			if(error)
			{
				callback(error, null);
				return;
			}

			callback(null, urlDocument);
		});
	}

	/**
	* @function
	* @public
	* Retrieve the most recently created URL from the database.
	*
	* @param {function} callback - Callback to handle the operation result or error.
	*
	* The callback is invoked as "callback(error, urlEntry)"
	* - error will either be undefined or an error returned by the mongo js driver.
	* - urlEntry is a {UrlEntry} and represents the document retrieved from the database.
	*	It may be undefined if an error occurred, or no document was found.
	*/
	this.getLastUrlCreated = function getLastUrlCreated(callback)
	{
		if(_database == undefined)
		{
			callback('UrlDatabase has not been initialized with a database. Unable to get last entry created', null);
			return;
		}
		else if(_lastUrlCreated != undefined)
		{
			callback(null, _lastUrlCreated);
		}


		_urlsCollection.find({}, {_id:false}).sort({keyAsInt: -1}).next(function(error, urlDocument){
			if(error)
			{
				callback(error, null);
				return;
			}
			else if(urlDocument == undefined)
			{
				_lastUrlCreated = undefined;
				callback(null, null);
				return;
			}


			_lastUrlCreated = urlDocument;
			callback(null, _CopyObj(urlDocument) );
		});
	}


	if(dbUri && connectCallback)
	{
		_self.init(dbUri, connectCallback);
	}


}


module.exports = UrlDatabase;



