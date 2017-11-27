
/**
* Wrapper for communicating with the LittleRl URL Shortener API
*/
const littlerlApi = new function()
{
	const _apiUrl = 'https://littlerl.herokuapp.com/api';

	/**
	* @function
	* Send a POST request to the API to shorten a url.
	*
	* @param {string} url - The url to shorten
	* @param {function} callback
	*
	* The provided callback is invoked in the fallowing manner
	* callback(apiResponse, internalServerError)
	*
	* - {object} apiResponse - Response from the server as an object
	* - {bool} internalServerError - Bool indicating if a status code of 5xx was returned by the api
	*/
	this.shortenUrlRequest = function(url, callback)
	{
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = onXhrStateChange;
		xhr.responseType = 'json';
		xhr.open('POST', `${_apiUrl}/create/?url=${url}`);
		xhr.send();

		function onXhrStateChange()
		{
			if(xhr.readyState== 4)
			{
				let internalServerError = false; 
				if(xhr.status >= 500 && xhr.status <= 599)
				{
					internalServerError = true;
				}
				callback(xhr.response, internalServerError);
			}
		}
	}
}


export default littlerlApi;



