const express = require('express');
const path = require('path');
const tinyKey = require('./tinyKey.js');
const urlUtils = require('./urlUtils.js');

const staticFilesPath = path.join(__dirname, '../www');
const htmlFilesPath = path.join(staticFilesPath, '/html');

const indexHtmlPath = path.join(htmlFilesPath, '/index.html');
const notFoundHtmlPath = path.join(htmlFilesPath, '/notFound.html');
const internalErrorHtmlPath = path.join(htmlFilesPath,  '/internalError.html');
const databaseDownHtmlPath = path.join(htmlFilesPath, '/databaseDown.html');

const app = express();
app.use(middleware_checkDatabase);
app.use(express.static(staticFilesPath) );
app.get('/', route_web_index);
app.get('/api/info', route_api_info);
app.post('/api/create', route_api_create);
app.get('/a/:key', route_web_redirect);
app.get('*', route_web_notFound);


function buildErrorObj(error, description, otherProperties)
{
	return Object.assign({error:error, description:description}, otherProperties);
}

function middleware_checkDatabase(request, response, next)
{
	if(request.app.urlDatabase)
	{
		request.urlDatabase = request.app.urlDatabase;
		next();
		return;
	}

	throw new Error('Attempted to run server without a UrlDatabase object reference. server.urlDatabase must be set.');

	if(request.accepts(['html', 'text', 'xml']) )
	{
		response.sendFile(databaseDownHtmlPath);
	}
	else
	{
		const error = 'Internal error';
		const errorMessage = 'Internal database error. URL Database is down at this time';
		response.json( buildErrorObj(error, errorMessage) );
	}
}

function route_web_index(request, response)
{
	response.sendFile(indexHtmlPath);
}

function route_web_notFound(request, response)
{
	response.sendFile(notFoundHtmlPath);
}


function route_api_info(request, response)
{
	let keyQuery = request.query.key;

	if(keyQuery == undefined)
	{
		const error = 'Missing query parameter';
		const description = 'The "key" query parameter was not supplied or was empty';

		response.status(400);
		response.json( buildErrorObj(error, description, {query:keyQuery}) );
		return;
	}
	else if(tinyKey.isKeyValid(keyQuery) == false )
	{
		const error = 'Invalid query parameter';
		const description = 'The "key" query parameter is not a valid base36 number';

		response.status(400);
		response.json( buildErrorObj(error, description, {query:keyQuery}) );
		return;
	}

	request.urlDatabase.getUrlInfo({key:keyQuery}, function(databaseError, urlDocument){
		if(databaseError)
		{		
			const error = 'Internal error';
			const description = 'Internal database error. Unable to get URL information at this time';

			response.status(500);
			response.json( buildErrorObj(error, description, {query:keyQuery}) );
			return;
		}

		let shortUrl = null;
		if(urlDocument)
		{
			shortUrl = urlUtils.standardizeUrl(request.hostname + '/a/' + urlDocument.key, true);
		}
		response.status(200);
		response.json( {urlEntry:urlDocument, shortUrl:shortUrl, query:keyQuery} );

	});
}

function route_api_create(request, response)
{
	let urlQuery = request.query.url;

	if(urlQuery == undefined)
	{
		const error = 'Missing query parameter';
		const description = 'The "url" query parameter was not supplied or was empty';

		response.status(400);
		response.json( buildErrorObj(error, description, {query:urlQuery}) );
		return;
	}
	else if(urlUtils.isUrlValid(urlQuery) == false )
	{
		const error = 'Invalid query parameter';
		const description = 'Invalid url. Make sure url starts with either "www." or a valid web protocol (http, https, or ftp), has no invalid characters, and ends with a valid top level domain';

		response.status(400);
		response.json( buildErrorObj(error, description, {query:urlQuery}) );
		return;
	}

	urlQuery = urlUtils.standardizeUrl(urlQuery);
	request.urlDatabase.createUrlEntry(urlQuery, function(error, urlDocument){
		if(error)
		{		
			const error = 'Internal error';
			const description = 'Internal database error. Unable to create new URL entry at this time';

			response.status(500);
			response.json( buildErrorObj(error, description, {query:urlQuery}) );
			return;
		}

		let shortUrl = null;
		if(urlDocument)
		{
			shortUrl = urlUtils.standardizeUrl(request.hostname + '/a/' + urlDocument.key, true);
		}
		response.status(200);
		response.json( {urlEntry:urlDocument, shortUrl:shortUrl, query:urlQuery} );
	});
}


function route_web_redirect(request, response)
{
	const providedKey = request.params.key;

	if(providedKey == undefined || tinyKey.isKeyValid(providedKey) == false )
	{
		response.status(404).sendFile(notFoundHtmlPath);
		return;
	}


	request.urlDatabase.getUrlInfo({key:providedKey}, function(error, urlDocument){
		if(error)
		{
			response.status(500).sendFile(internalErrorHtmlPath);
			return;
		}
		else if(urlDocument == undefined)
		{
			response.status(404).sendFile(notFoundHtmlPath);
			return;
		}

		let redirectUrl = urlDocument.url;
		const defaultProtocol = 'http';
		if(urlUtils.getProtocol(redirectUrl) == undefined )
		{
			redirectUrl = urlUtils.appendProtocol(redirectUrl, defaultProtocol);
		}


		response.redirect(302, redirectUrl);

	});
}


module.exports = app;

