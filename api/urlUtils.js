const nodeUrl = require('url');
const urlRegex = require('url-regex');


/**
* Small set of utilities for helping with URL validation in URL Shortening Services.
*/
const urlUtils = {};


urlUtils.validUrlProtocols = ['http://', 'https://', 'ftp://', 'http', 'https', 'ftp', ];


/**
* @function
*
* Loosly determine if a url format appears to be valid or not
* To be valid the url must
* - Start with "www" OR a valid web protocol (http://, https:// or ftp://)
* - End in a valid top level domain (TLD) such as ".com" ".com.uk" ".uk" etc...
*
* @Note
* This function does not make any attempt to check whether the URI is accessible
* or 'makes sense' in any meaningful way.  It just checks that it is formatted
* correctly.
*
* @param {string} urlString
* @returns {bool}
*/
urlUtils.isUrlValid = function isUrlValid(urlString)
{
	/* 
	* Both check that the URL is valid and starts with either a protocol or "www" but the second one
	* ensures that the url contains a valid TLD such as ".com" or ".uk"
	*/
	const urlIsValid = urlRegex({exact:true, strict:true}).test(urlString);
	const urlIsValidWithTLD = urlRegex({exact:true, strict:false}).test(urlString);

	/*
	* IF the url has a protocol, check that it is a valid protocol
	*/
	const urlProtocol = this.getProtocol(urlString);
	const urlProtocolIsValid = (urlProtocol == undefined || this.validUrlProtocols.includes(urlProtocol.toLowerCase()) == true );

	return urlIsValid && urlIsValidWithTLD && urlProtocolIsValid;
}.bind(urlUtils);


/**
* @function
*
* Return the protocol of a givin url string.*
* If the url string does not have a protocol, undefined is returned.
* Note that this function does not check if the protocol is valid or not, it simply returns it.
*
* @param {string} urlString
* @returns {string|undefined}
*/
urlUtils.getProtocol = function getProtocol(urlString)
{
	const protocolMatcher = /^([a-z0-9]{1,}):\/\//gi;
	const matchResults = urlString.match(protocolMatcher);

	if(matchResults == undefined)
	{
		return undefined;
	}
	else
	{
		// remove the trailing //: at the end so only the protocol name is left
		return matchResults[0].slice(0, -3);
	}
}

/**
* @function
*
* Appends a protocol to a url string and then return the new string with the added protocol.
* @param {string} urlstring
* @param {string} protocol - Protocol to append. Do not include the colon and forwards slashes "://" in the protocol.
*/
urlUtils.appendProtocol = function appendProtocol(urlString, protocol)
{
	return protocol + '://' + urlString;
}


/**
* @function
* Converts the case insensitive parts of a url to lowercase and adds a trailing "/" forward slash at the end
* if no path aka uri was specified in the url.
* Also optionaly adds the default http protocol to the url if no other protocol is present.
*
* @param {string} urlString
* @param {bool} addProtocol - If set to true, the http protocol will be appended to the url if the url does not already
* have a protocol.
*
* @param {string}
*/
urlUtils.standardizeUrl = function correctCase(urlString, addProtocol=false)
{
	let tempProtocolAdded = false;
	if(urlUtils.getProtocol(urlString) == undefined )
	{
		/*
		* Nodes' url object treats urls without a protocol differently
		* Teporarly add a porotocol for uniform behavior.
		*/
		urlString = urlUtils.appendProtocol(urlString, 'http');
		tempProtocolAdded = true;
	}
	
	let urlObject = nodeUrl.parse(urlString);
	let standardizedUrl = urlObject.href;
	
	if(tempProtocolAdded == true && addProtocol == false)
	{
		// remove the temoparary added protocol and the protocol forward slashes //
		standardizedUrl = standardizedUrl.slice(urlObject.protocol.length + 2);
	}
	
	return standardizedUrl;
}





module.exports = urlUtils;


