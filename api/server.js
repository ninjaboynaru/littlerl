// const lx = console.log;
// lx replacment regex: lx\(['"-a-z0-9 ]*\);

const app = require('./app.js');
const UrlDatabase = require('./urlDatabase');

const serverPort = process.env.PORT || 80;
const envType = (process.env.NODE_ENV || 'production').toLowerCase();

let mongoConfig;

/*
* If server is running on Heroku, no config file is present due to .gitignore.
* Thus The heroku app must set the env variables used below.
*/
try {
	mongoConfig = require('../config/mongoConfig.json');
}
catch(e) {
	let mongoProdUri = process.env.MONGO_PROD_URI;
	let mongoDevUri = process.env.MONGO_DEV_URI;
	
	if(mongoProdUri == undefined || mongoDevUri == undefined)
	{
		throw new Error('no mongoConfig.json file found and env variables MONGO_PROD_URI or MONGO_DEV_URI have not been set.');	
	}
	
	mongoConfig = {
		productionUri:mongoProdUri,
		developmentUri:mongoDevUri
	}
	
}

let mongoUri;
if(envType == 'production')
{
	mongoUri = mongoConfig.productionUri;
}
else
{
	mongoUri = mongoConfig.developmentUri;
}

new UrlDatabase(mongoUri, function(error, mongoDb, urlDb){
	if(error)
	{
		console.error(`Error connecting to mongo uri ${mongoUri} `, error);
		throw new Error(error);
		return;
	}

	console.log('Connected to Mongo Database');
	console.log('Enviorment type: ' + envType);
	
	app.urlDatabase = urlDb;
	
	app.listen(serverPort, function(){
		console.log('URLShortener server started on port ' + serverPort);
	});
});







//const mlabUser = 'MainUser';
//const mlabPassword = 'MainPass';
//const mongoUri = `mongodb://${mlabUser}:${mlabPassword}@ds042607.mlab.com:42607/url_shortener_microapi`;



