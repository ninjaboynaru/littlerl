const littlerlUi = new function()
{
	const _self = this;

	/**
	* @private
	* UI elements used and their corisponding ids.
	* Each is dynamically initialized and set in the init() function
	*/
	let _uiElements = {
		controlsTitle: {id:'js-controls-title', element:null},
		inputField: {id:'js-input-field', element:null},
		submitBtn: {id:'js-submit-btn', element:null},

		resultsWrapper: {id:'js-results-wrapper', element:null},
		resultsText: {id:'js-results-text', element:null},
		resultsList: {id:'js-results-list', element:null},
		resultsListUrlLink: {id:'js-results-list-urlLink', element:null},
		resultsListKey: {id:'js-results-list-key', element:null}
	}

	/**
	* @callback
	* @private
	* Function to be called when the submit btn is pressed or enter key is pressed while inside text input
	*/
	this.onSubmit;

	/**
	* @callback
	* @private
	* Called when enter key is pressed inside text input
	*/
	function _onInputEnterInternal(e)
	{		
		if(e.key == 'Enter' && _self.onSubmit)
		{
			_self.onSubmit(_self.getInputText() );
		}
	}
	/**
	* @callback
	* Called when submit btn is pressed
	*/
	function _onSubmitInternal()
	{

		if(_self.onSubmit)
		{
			_self.onSubmit(_self.getInputText() );
		}
	}

	
	this.init = function()
	{
		for(const uiProperty in _uiElements)
		{
			const currentUi = _uiElements[uiProperty];
			currentUi.element = document.getElementById(currentUi.id);
			if(currentUi.element == undefined)
			{
				console.error(`Could not find element with id "${currentUi.id}". Application may not work.`);
			}
		}

		if(_uiElements.inputField.element)
		{
			_uiElements.inputField.element.onkeypress = _onInputEnterInternal;
		}
		if(_uiElements.submitBtn.element)
		{
			_uiElements.submitBtn.element.onclick = _onSubmitInternal;
		}
	}

	this.setControlsTitle = function(text)
	{
		_uiElements.controlsTitle.element.textContent = text;
	}
	this.getInputText = function()
	{
		return _uiElements.inputField.element.value;
	}

	this.setResultsText = function(text)
	{
		_uiElements.resultsText.element.textContent = text;
	}


	this.enableResultsWrapper = function(enable=true)
	{
		if(enable == true)
		{
			_uiElements.resultsWrapper.element.style.display = '';
		}
		else
		{
			_uiElements.resultsWrapper.element.style.display = 'none';
		}
	}
	this.enableResultsList = function(enable=true)
	{
		if(enable == true)
		{
			_uiElements.resultsList.element.style.display = '';
		}
		else
		{
			_uiElements.resultsList.element.style.display = 'none';
		}
	}

	/**
	* @function
	* Set the contents of the results list.
	* The url parameter is also used as the href for the url-link element.
	*/
	this.setResultsList = function(url='', key='')
	{
		_uiElements.resultsListUrlLink.element.textContent = url;
		_uiElements.resultsListUrlLink.element.href = url;
		_uiElements.resultsListKey.element.textContent = key;
	}

	this.clearResultsUi = function()
	{
		_self.setResultsText('');
		_self.setResultsList('','');
		_self.enableResultsList(false);
	}




}

export default littlerlUi;

