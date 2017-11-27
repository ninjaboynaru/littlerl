import littlerlApi from './littlerl-api.js';
import littlerlUi from './littlerl-ui.js';



const  littlerlApp = new function()
{
	const _self = this;
	
	this.init = function()
	{
		littlerlUi.init();
		littlerlUi.onSubmit = _self.onSubmit;
	}
	
	this.onSubmit = function(inputText)
	{
		if(inputText == undefined)
		{
			return;
		}
		
		littlerlUi.clearResultsUi();
		littlerlUi.enableResultsWrapper(false);
		littlerlApi.shortenUrlRequest(inputText, _onShortenUrlResponse);
	}
	
	function _onShortenUrlResponse(apiResponse, internalServerError)
	{
		console.log(apiResponse);
		if(internalServerError == true)
		{
			let resultsText = 'Sorry, something went wrong with our the servers. ';
			resultsText += 'We are working hard to fix it. Please try again later.';
			littlerlUi.setResultsText(resultsText);
			littlerlUi.enableResultsWrapper(true);
			littlerlUi.enableResultsList(false);
		}
		else if(apiResponse.error)
		{
			let resultsText = 'The url you entered was not valid. ';
			resultsText += 'Make sure the url ends in a valid top level domain (".com", ".gov", ".uk" etc...) '; 
			resultsText += 'and starts with "www" or a valid web protocol such as "http" or "https"';
			
			littlerlUi.setControlsTitle('Please enter a VALID url');
			littlerlUi.setResultsText(resultsText);
			littlerlUi.enableResultsWrapper(true);
			littlerlUi.enableResultsList(false);
		}
		else
		{
			let resultsText = `Your short URL`;
			littlerlUi.setResultsText(resultsText);
			littlerlUi.enableResultsWrapper(true);
			littlerlUi.enableResultsList(true);
			
			littlerlUi.setResultsList(apiResponse.shortUrl, apiResponse.urlEntry.key);
		}
	}	
}




window.addEventListener('load', littlerlApp.init);


