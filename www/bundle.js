/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__littlerl_api_js__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__ = __webpack_require__(3);\n\r\n\r\n\r\n\r\n\r\nconst  littlerlApp = new function()\r\n{\r\n\tconst _self = this;\r\n\t\r\n\tthis.init = function()\r\n\t{\r\n\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].init();\r\n\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].onSubmit = _self.onSubmit;\r\n\t}\r\n\t\r\n\tthis.onSubmit = function(inputText)\r\n\t{\r\n\t\tif(inputText == undefined)\r\n\t\t{\r\n\t\t\treturn;\r\n\t\t}\r\n\t\t\r\n\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].clearResultsUi();\r\n\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].enableResultsWrapper(false);\r\n\t\t__WEBPACK_IMPORTED_MODULE_0__littlerl_api_js__[\"a\" /* default */].shortenUrlRequest(inputText, _onShortenUrlResponse);\r\n\t}\r\n\t\r\n\tfunction _onShortenUrlResponse(apiResponse, internalServerError)\r\n\t{\r\n\t\tconsole.log(apiResponse);\r\n\t\tif(internalServerError == true)\r\n\t\t{\r\n\t\t\tlet resultsText = 'Sorry, something went wrong with our the servers. ';\r\n\t\t\tresultsText += 'We are working hard to fix it. Please try again later.';\r\n\t\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].setResultsText(resultsText);\r\n\t\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].enableResultsWrapper(true);\r\n\t\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].enableResultsList(false);\r\n\t\t}\r\n\t\telse if(apiResponse.error)\r\n\t\t{\r\n\t\t\tlet resultsText = 'The url you entered was not valid. ';\r\n\t\t\tresultsText += 'Make sure the url ends in a valid top level domain (\".com\", \".gov\", \".uk\" etc...) '; \r\n\t\t\tresultsText += 'and starts with \"www\" or a valid web protocol such as \"http\" or \"https\"';\r\n\t\t\t\r\n\t\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].setControlsTitle('Please enter a VALID url');\r\n\t\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].setResultsText(resultsText);\r\n\t\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].enableResultsWrapper(true);\r\n\t\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].enableResultsList(false);\r\n\t\t}\r\n\t\telse\r\n\t\t{\r\n\t\t\tlet resultsText = `Your short URL`;\r\n\t\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].setResultsText(resultsText);\r\n\t\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].enableResultsWrapper(true);\r\n\t\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].enableResultsList(true);\r\n\t\t\t\r\n\t\t\t__WEBPACK_IMPORTED_MODULE_1__littlerl_ui_js__[\"a\" /* default */].setResultsList(apiResponse.shortUrl, apiResponse.urlEntry.key);\r\n\t\t}\r\n\t}\t\r\n}\r\n\r\n\r\n\r\n\r\nwindow.addEventListener('load', littlerlApp.init);\r\n\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3d3dy1qcy9pbmRleC5qcz80NmI5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsaXR0bGVybEFwaSBmcm9tICcuL2xpdHRsZXJsLWFwaS5qcyc7XHJcbmltcG9ydCBsaXR0bGVybFVpIGZyb20gJy4vbGl0dGxlcmwtdWkuanMnO1xyXG5cclxuXHJcblxyXG5jb25zdCAgbGl0dGxlcmxBcHAgPSBuZXcgZnVuY3Rpb24oKVxyXG57XHJcblx0Y29uc3QgX3NlbGYgPSB0aGlzO1xyXG5cdFxyXG5cdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHRsaXR0bGVybFVpLmluaXQoKTtcclxuXHRcdGxpdHRsZXJsVWkub25TdWJtaXQgPSBfc2VsZi5vblN1Ym1pdDtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5vblN1Ym1pdCA9IGZ1bmN0aW9uKGlucHV0VGV4dClcclxuXHR7XHJcblx0XHRpZihpbnB1dFRleHQgPT0gdW5kZWZpbmVkKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGxpdHRsZXJsVWkuY2xlYXJSZXN1bHRzVWkoKTtcclxuXHRcdGxpdHRsZXJsVWkuZW5hYmxlUmVzdWx0c1dyYXBwZXIoZmFsc2UpO1xyXG5cdFx0bGl0dGxlcmxBcGkuc2hvcnRlblVybFJlcXVlc3QoaW5wdXRUZXh0LCBfb25TaG9ydGVuVXJsUmVzcG9uc2UpO1xyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiBfb25TaG9ydGVuVXJsUmVzcG9uc2UoYXBpUmVzcG9uc2UsIGludGVybmFsU2VydmVyRXJyb3IpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5sb2coYXBpUmVzcG9uc2UpO1xyXG5cdFx0aWYoaW50ZXJuYWxTZXJ2ZXJFcnJvciA9PSB0cnVlKVxyXG5cdFx0e1xyXG5cdFx0XHRsZXQgcmVzdWx0c1RleHQgPSAnU29ycnksIHNvbWV0aGluZyB3ZW50IHdyb25nIHdpdGggb3VyIHRoZSBzZXJ2ZXJzLiAnO1xyXG5cdFx0XHRyZXN1bHRzVGV4dCArPSAnV2UgYXJlIHdvcmtpbmcgaGFyZCB0byBmaXggaXQuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJztcclxuXHRcdFx0bGl0dGxlcmxVaS5zZXRSZXN1bHRzVGV4dChyZXN1bHRzVGV4dCk7XHJcblx0XHRcdGxpdHRsZXJsVWkuZW5hYmxlUmVzdWx0c1dyYXBwZXIodHJ1ZSk7XHJcblx0XHRcdGxpdHRsZXJsVWkuZW5hYmxlUmVzdWx0c0xpc3QoZmFsc2UpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihhcGlSZXNwb25zZS5lcnJvcilcclxuXHRcdHtcclxuXHRcdFx0bGV0IHJlc3VsdHNUZXh0ID0gJ1RoZSB1cmwgeW91IGVudGVyZWQgd2FzIG5vdCB2YWxpZC4gJztcclxuXHRcdFx0cmVzdWx0c1RleHQgKz0gJ01ha2Ugc3VyZSB0aGUgdXJsIGVuZHMgaW4gYSB2YWxpZCB0b3AgbGV2ZWwgZG9tYWluIChcIi5jb21cIiwgXCIuZ292XCIsIFwiLnVrXCIgZXRjLi4uKSAnOyBcclxuXHRcdFx0cmVzdWx0c1RleHQgKz0gJ2FuZCBzdGFydHMgd2l0aCBcInd3d1wiIG9yIGEgdmFsaWQgd2ViIHByb3RvY29sIHN1Y2ggYXMgXCJodHRwXCIgb3IgXCJodHRwc1wiJztcclxuXHRcdFx0XHJcblx0XHRcdGxpdHRsZXJsVWkuc2V0Q29udHJvbHNUaXRsZSgnUGxlYXNlIGVudGVyIGEgVkFMSUQgdXJsJyk7XHJcblx0XHRcdGxpdHRsZXJsVWkuc2V0UmVzdWx0c1RleHQocmVzdWx0c1RleHQpO1xyXG5cdFx0XHRsaXR0bGVybFVpLmVuYWJsZVJlc3VsdHNXcmFwcGVyKHRydWUpO1xyXG5cdFx0XHRsaXR0bGVybFVpLmVuYWJsZVJlc3VsdHNMaXN0KGZhbHNlKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0bGV0IHJlc3VsdHNUZXh0ID0gYFlvdXIgc2hvcnQgVVJMYDtcclxuXHRcdFx0bGl0dGxlcmxVaS5zZXRSZXN1bHRzVGV4dChyZXN1bHRzVGV4dCk7XHJcblx0XHRcdGxpdHRsZXJsVWkuZW5hYmxlUmVzdWx0c1dyYXBwZXIodHJ1ZSk7XHJcblx0XHRcdGxpdHRsZXJsVWkuZW5hYmxlUmVzdWx0c0xpc3QodHJ1ZSk7XHJcblx0XHRcdFxyXG5cdFx0XHRsaXR0bGVybFVpLnNldFJlc3VsdHNMaXN0KGFwaVJlc3BvbnNlLnNob3J0VXJsLCBhcGlSZXNwb25zZS51cmxFbnRyeS5rZXkpO1xyXG5cdFx0fVxyXG5cdH1cdFxyXG59XHJcblxyXG5cclxuXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGxpdHRsZXJsQXBwLmluaXQpO1xyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vd3d3LWpzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n* Wrapper for communicating with the LittleRl URL Shortener API\r\n*/\r\nconst littlerlApi = new function()\r\n{\r\n\tconst _apiUrl = 'https://littlerl.herokuapp.com/api';\r\n\r\n\t/**\r\n\t* @function\r\n\t* Send a POST request to the API to shorten a url.\r\n\t*\r\n\t* @param {string} url - The url to shorten\r\n\t* @param {function} callback\r\n\t*\r\n\t* The provided callback is invoked in the fallowing manner\r\n\t* callback(apiResponse, internalServerError)\r\n\t*\r\n\t* - {object} apiResponse - Response from the server as an object\r\n\t* - {bool} internalServerError - Bool indicating if a status code of 5xx was returned by the api\r\n\t*/\r\n\tthis.shortenUrlRequest = function(url, callback)\r\n\t{\r\n\t\tconst xhr = new XMLHttpRequest();\r\n\t\txhr.onreadystatechange = onXhrStateChange;\r\n\t\txhr.responseType = 'json';\r\n\t\txhr.open('POST', `${_apiUrl}/create/?url=${url}`);\r\n\t\txhr.send();\r\n\r\n\t\tfunction onXhrStateChange()\r\n\t\t{\r\n\t\t\tif(xhr.readyState== 4)\r\n\t\t\t{\r\n\t\t\t\tlet internalServerError = false; \r\n\t\t\t\tif(xhr.status >= 500 && xhr.status <= 599)\r\n\t\t\t\t{\r\n\t\t\t\t\tinternalServerError = true;\r\n\t\t\t\t}\r\n\t\t\t\tcallback(xhr.response, internalServerError);\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"a\"] = (littlerlApi);\r\n\r\n\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3d3dy1qcy9saXR0bGVybC1hcGkuanM/OTM0MSJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiogV3JhcHBlciBmb3IgY29tbXVuaWNhdGluZyB3aXRoIHRoZSBMaXR0bGVSbCBVUkwgU2hvcnRlbmVyIEFQSVxyXG4qL1xyXG5jb25zdCBsaXR0bGVybEFwaSA9IG5ldyBmdW5jdGlvbigpXHJcbntcclxuXHRjb25zdCBfYXBpVXJsID0gJ2h0dHBzOi8vbGl0dGxlcmwuaGVyb2t1YXBwLmNvbS9hcGknO1xyXG5cclxuXHQvKipcclxuXHQqIEBmdW5jdGlvblxyXG5cdCogU2VuZCBhIFBPU1QgcmVxdWVzdCB0byB0aGUgQVBJIHRvIHNob3J0ZW4gYSB1cmwuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFRoZSB1cmwgdG8gc2hvcnRlblxyXG5cdCogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcclxuXHQqXHJcblx0KiBUaGUgcHJvdmlkZWQgY2FsbGJhY2sgaXMgaW52b2tlZCBpbiB0aGUgZmFsbG93aW5nIG1hbm5lclxyXG5cdCogY2FsbGJhY2soYXBpUmVzcG9uc2UsIGludGVybmFsU2VydmVyRXJyb3IpXHJcblx0KlxyXG5cdCogLSB7b2JqZWN0fSBhcGlSZXNwb25zZSAtIFJlc3BvbnNlIGZyb20gdGhlIHNlcnZlciBhcyBhbiBvYmplY3RcclxuXHQqIC0ge2Jvb2x9IGludGVybmFsU2VydmVyRXJyb3IgLSBCb29sIGluZGljYXRpbmcgaWYgYSBzdGF0dXMgY29kZSBvZiA1eHggd2FzIHJldHVybmVkIGJ5IHRoZSBhcGlcclxuXHQqL1xyXG5cdHRoaXMuc2hvcnRlblVybFJlcXVlc3QgPSBmdW5jdGlvbih1cmwsIGNhbGxiYWNrKVxyXG5cdHtcclxuXHRcdGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG9uWGhyU3RhdGVDaGFuZ2U7XHJcblx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xyXG5cdFx0eGhyLm9wZW4oJ1BPU1QnLCBgJHtfYXBpVXJsfS9jcmVhdGUvP3VybD0ke3VybH1gKTtcclxuXHRcdHhoci5zZW5kKCk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gb25YaHJTdGF0ZUNoYW5nZSgpXHJcblx0XHR7XHJcblx0XHRcdGlmKHhoci5yZWFkeVN0YXRlPT0gNClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxldCBpbnRlcm5hbFNlcnZlckVycm9yID0gZmFsc2U7IFxyXG5cdFx0XHRcdGlmKHhoci5zdGF0dXMgPj0gNTAwICYmIHhoci5zdGF0dXMgPD0gNTk5KVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGludGVybmFsU2VydmVyRXJyb3IgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYWxsYmFjayh4aHIucmVzcG9uc2UsIGludGVybmFsU2VydmVyRXJyb3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGl0dGxlcmxBcGk7XHJcblxyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vd3d3LWpzL2xpdHRsZXJsLWFwaS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("const littlerlUi = new function()\r\n{\r\n\tconst _self = this;\r\n\r\n\t/**\r\n\t* @private\r\n\t* UI elements used and their corisponding ids.\r\n\t* Each is dynamically initialized and set in the init() function\r\n\t*/\r\n\tlet _uiElements = {\r\n\t\tcontrolsTitle: {id:'js-controls-title', element:null},\r\n\t\tinputField: {id:'js-input-field', element:null},\r\n\t\tsubmitBtn: {id:'js-submit-btn', element:null},\r\n\r\n\t\tresultsWrapper: {id:'js-results-wrapper', element:null},\r\n\t\tresultsText: {id:'js-results-text', element:null},\r\n\t\tresultsList: {id:'js-results-list', element:null},\r\n\t\tresultsListUrlLink: {id:'js-results-list-urlLink', element:null},\r\n\t\tresultsListKey: {id:'js-results-list-key', element:null}\r\n\t}\r\n\r\n\t/**\r\n\t* @callback\r\n\t* @private\r\n\t* Function to be called when the submit btn is pressed or enter key is pressed while inside text input\r\n\t*/\r\n\tthis.onSubmit;\r\n\r\n\t/**\r\n\t* @callback\r\n\t* @private\r\n\t* Called when enter key is pressed inside text input\r\n\t*/\r\n\tfunction _onInputEnterInternal(e)\r\n\t{\t\t\r\n\t\tif(e.key == 'Enter' && _self.onSubmit)\r\n\t\t{\r\n\t\t\t_self.onSubmit(_self.getInputText() );\r\n\t\t}\r\n\t}\r\n\t/**\r\n\t* @callback\r\n\t* Called when submit btn is pressed\r\n\t*/\r\n\tfunction _onSubmitInternal()\r\n\t{\r\n\r\n\t\tif(_self.onSubmit)\r\n\t\t{\r\n\t\t\t_self.onSubmit(_self.getInputText() );\r\n\t\t}\r\n\t}\r\n\r\n\t\r\n\tthis.init = function()\r\n\t{\r\n\t\tfor(const uiProperty in _uiElements)\r\n\t\t{\r\n\t\t\tconst currentUi = _uiElements[uiProperty];\r\n\t\t\tcurrentUi.element = document.getElementById(currentUi.id);\r\n\t\t\tif(currentUi.element == undefined)\r\n\t\t\t{\r\n\t\t\t\tconsole.error(`Could not find element with id \"${currentUi.id}\". Application may not work.`);\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\tif(_uiElements.inputField.element)\r\n\t\t{\r\n\t\t\t_uiElements.inputField.element.onkeypress = _onInputEnterInternal;\r\n\t\t}\r\n\t\tif(_uiElements.submitBtn.element)\r\n\t\t{\r\n\t\t\t_uiElements.submitBtn.element.onclick = _onSubmitInternal;\r\n\t\t}\r\n\t}\r\n\r\n\tthis.setControlsTitle = function(text)\r\n\t{\r\n\t\t_uiElements.controlsTitle.element.textContent = text;\r\n\t}\r\n\tthis.getInputText = function()\r\n\t{\r\n\t\treturn _uiElements.inputField.element.value;\r\n\t}\r\n\r\n\tthis.setResultsText = function(text)\r\n\t{\r\n\t\t_uiElements.resultsText.element.textContent = text;\r\n\t}\r\n\r\n\r\n\tthis.enableResultsWrapper = function(enable=true)\r\n\t{\r\n\t\tif(enable == true)\r\n\t\t{\r\n\t\t\t_uiElements.resultsWrapper.element.style.display = '';\r\n\t\t}\r\n\t\telse\r\n\t\t{\r\n\t\t\t_uiElements.resultsWrapper.element.style.display = 'none';\r\n\t\t}\r\n\t}\r\n\tthis.enableResultsList = function(enable=true)\r\n\t{\r\n\t\tif(enable == true)\r\n\t\t{\r\n\t\t\t_uiElements.resultsList.element.style.display = '';\r\n\t\t}\r\n\t\telse\r\n\t\t{\r\n\t\t\t_uiElements.resultsList.element.style.display = 'none';\r\n\t\t}\r\n\t}\r\n\r\n\t/**\r\n\t* @function\r\n\t* Set the contents of the results list.\r\n\t* The url parameter is also used as the href for the url-link element.\r\n\t*/\r\n\tthis.setResultsList = function(url='', key='')\r\n\t{\r\n\t\t_uiElements.resultsListUrlLink.element.textContent = url;\r\n\t\t_uiElements.resultsListUrlLink.element.href = url;\r\n\t\t_uiElements.resultsListKey.element.textContent = key;\r\n\t}\r\n\r\n\tthis.clearResultsUi = function()\r\n\t{\r\n\t\t_self.setResultsText('');\r\n\t\t_self.setResultsList('','');\r\n\t\t_self.enableResultsList(false);\r\n\t}\r\n\r\n\r\n\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"a\"] = (littlerlUi);\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3d3dy1qcy9saXR0bGVybC11aS5qcz9jZGU3Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGxpdHRsZXJsVWkgPSBuZXcgZnVuY3Rpb24oKVxyXG57XHJcblx0Y29uc3QgX3NlbGYgPSB0aGlzO1xyXG5cclxuXHQvKipcclxuXHQqIEBwcml2YXRlXHJcblx0KiBVSSBlbGVtZW50cyB1c2VkIGFuZCB0aGVpciBjb3Jpc3BvbmRpbmcgaWRzLlxyXG5cdCogRWFjaCBpcyBkeW5hbWljYWxseSBpbml0aWFsaXplZCBhbmQgc2V0IGluIHRoZSBpbml0KCkgZnVuY3Rpb25cclxuXHQqL1xyXG5cdGxldCBfdWlFbGVtZW50cyA9IHtcclxuXHRcdGNvbnRyb2xzVGl0bGU6IHtpZDonanMtY29udHJvbHMtdGl0bGUnLCBlbGVtZW50Om51bGx9LFxyXG5cdFx0aW5wdXRGaWVsZDoge2lkOidqcy1pbnB1dC1maWVsZCcsIGVsZW1lbnQ6bnVsbH0sXHJcblx0XHRzdWJtaXRCdG46IHtpZDonanMtc3VibWl0LWJ0bicsIGVsZW1lbnQ6bnVsbH0sXHJcblxyXG5cdFx0cmVzdWx0c1dyYXBwZXI6IHtpZDonanMtcmVzdWx0cy13cmFwcGVyJywgZWxlbWVudDpudWxsfSxcclxuXHRcdHJlc3VsdHNUZXh0OiB7aWQ6J2pzLXJlc3VsdHMtdGV4dCcsIGVsZW1lbnQ6bnVsbH0sXHJcblx0XHRyZXN1bHRzTGlzdDoge2lkOidqcy1yZXN1bHRzLWxpc3QnLCBlbGVtZW50Om51bGx9LFxyXG5cdFx0cmVzdWx0c0xpc3RVcmxMaW5rOiB7aWQ6J2pzLXJlc3VsdHMtbGlzdC11cmxMaW5rJywgZWxlbWVudDpudWxsfSxcclxuXHRcdHJlc3VsdHNMaXN0S2V5OiB7aWQ6J2pzLXJlc3VsdHMtbGlzdC1rZXknLCBlbGVtZW50Om51bGx9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIEBjYWxsYmFja1xyXG5cdCogQHByaXZhdGVcclxuXHQqIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBzdWJtaXQgYnRuIGlzIHByZXNzZWQgb3IgZW50ZXIga2V5IGlzIHByZXNzZWQgd2hpbGUgaW5zaWRlIHRleHQgaW5wdXRcclxuXHQqL1xyXG5cdHRoaXMub25TdWJtaXQ7XHJcblxyXG5cdC8qKlxyXG5cdCogQGNhbGxiYWNrXHJcblx0KiBAcHJpdmF0ZVxyXG5cdCogQ2FsbGVkIHdoZW4gZW50ZXIga2V5IGlzIHByZXNzZWQgaW5zaWRlIHRleHQgaW5wdXRcclxuXHQqL1xyXG5cdGZ1bmN0aW9uIF9vbklucHV0RW50ZXJJbnRlcm5hbChlKVxyXG5cdHtcdFx0XHJcblx0XHRpZihlLmtleSA9PSAnRW50ZXInICYmIF9zZWxmLm9uU3VibWl0KVxyXG5cdFx0e1xyXG5cdFx0XHRfc2VsZi5vblN1Ym1pdChfc2VsZi5nZXRJbnB1dFRleHQoKSApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvKipcclxuXHQqIEBjYWxsYmFja1xyXG5cdCogQ2FsbGVkIHdoZW4gc3VibWl0IGJ0biBpcyBwcmVzc2VkXHJcblx0Ki9cclxuXHRmdW5jdGlvbiBfb25TdWJtaXRJbnRlcm5hbCgpXHJcblx0e1xyXG5cclxuXHRcdGlmKF9zZWxmLm9uU3VibWl0KVxyXG5cdFx0e1xyXG5cdFx0XHRfc2VsZi5vblN1Ym1pdChfc2VsZi5nZXRJbnB1dFRleHQoKSApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0XHJcblx0dGhpcy5pbml0ID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdGZvcihjb25zdCB1aVByb3BlcnR5IGluIF91aUVsZW1lbnRzKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zdCBjdXJyZW50VWkgPSBfdWlFbGVtZW50c1t1aVByb3BlcnR5XTtcclxuXHRcdFx0Y3VycmVudFVpLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50VWkuaWQpO1xyXG5cdFx0XHRpZihjdXJyZW50VWkuZWxlbWVudCA9PSB1bmRlZmluZWQpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGBDb3VsZCBub3QgZmluZCBlbGVtZW50IHdpdGggaWQgXCIke2N1cnJlbnRVaS5pZH1cIi4gQXBwbGljYXRpb24gbWF5IG5vdCB3b3JrLmApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoX3VpRWxlbWVudHMuaW5wdXRGaWVsZC5lbGVtZW50KVxyXG5cdFx0e1xyXG5cdFx0XHRfdWlFbGVtZW50cy5pbnB1dEZpZWxkLmVsZW1lbnQub25rZXlwcmVzcyA9IF9vbklucHV0RW50ZXJJbnRlcm5hbDtcclxuXHRcdH1cclxuXHRcdGlmKF91aUVsZW1lbnRzLnN1Ym1pdEJ0bi5lbGVtZW50KVxyXG5cdFx0e1xyXG5cdFx0XHRfdWlFbGVtZW50cy5zdWJtaXRCdG4uZWxlbWVudC5vbmNsaWNrID0gX29uU3VibWl0SW50ZXJuYWw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR0aGlzLnNldENvbnRyb2xzVGl0bGUgPSBmdW5jdGlvbih0ZXh0KVxyXG5cdHtcclxuXHRcdF91aUVsZW1lbnRzLmNvbnRyb2xzVGl0bGUuZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XHJcblx0fVxyXG5cdHRoaXMuZ2V0SW5wdXRUZXh0ID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHJldHVybiBfdWlFbGVtZW50cy5pbnB1dEZpZWxkLmVsZW1lbnQudmFsdWU7XHJcblx0fVxyXG5cclxuXHR0aGlzLnNldFJlc3VsdHNUZXh0ID0gZnVuY3Rpb24odGV4dClcclxuXHR7XHJcblx0XHRfdWlFbGVtZW50cy5yZXN1bHRzVGV4dC5lbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcclxuXHR9XHJcblxyXG5cclxuXHR0aGlzLmVuYWJsZVJlc3VsdHNXcmFwcGVyID0gZnVuY3Rpb24oZW5hYmxlPXRydWUpXHJcblx0e1xyXG5cdFx0aWYoZW5hYmxlID09IHRydWUpXHJcblx0XHR7XHJcblx0XHRcdF91aUVsZW1lbnRzLnJlc3VsdHNXcmFwcGVyLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHRfdWlFbGVtZW50cy5yZXN1bHRzV3JhcHBlci5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHR9XHJcblx0fVxyXG5cdHRoaXMuZW5hYmxlUmVzdWx0c0xpc3QgPSBmdW5jdGlvbihlbmFibGU9dHJ1ZSlcclxuXHR7XHJcblx0XHRpZihlbmFibGUgPT0gdHJ1ZSlcclxuXHRcdHtcclxuXHRcdFx0X3VpRWxlbWVudHMucmVzdWx0c0xpc3QuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdF91aUVsZW1lbnRzLnJlc3VsdHNMaXN0LmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogQGZ1bmN0aW9uXHJcblx0KiBTZXQgdGhlIGNvbnRlbnRzIG9mIHRoZSByZXN1bHRzIGxpc3QuXHJcblx0KiBUaGUgdXJsIHBhcmFtZXRlciBpcyBhbHNvIHVzZWQgYXMgdGhlIGhyZWYgZm9yIHRoZSB1cmwtbGluayBlbGVtZW50LlxyXG5cdCovXHJcblx0dGhpcy5zZXRSZXN1bHRzTGlzdCA9IGZ1bmN0aW9uKHVybD0nJywga2V5PScnKVxyXG5cdHtcclxuXHRcdF91aUVsZW1lbnRzLnJlc3VsdHNMaXN0VXJsTGluay5lbGVtZW50LnRleHRDb250ZW50ID0gdXJsO1xyXG5cdFx0X3VpRWxlbWVudHMucmVzdWx0c0xpc3RVcmxMaW5rLmVsZW1lbnQuaHJlZiA9IHVybDtcclxuXHRcdF91aUVsZW1lbnRzLnJlc3VsdHNMaXN0S2V5LmVsZW1lbnQudGV4dENvbnRlbnQgPSBrZXk7XHJcblx0fVxyXG5cclxuXHR0aGlzLmNsZWFyUmVzdWx0c1VpID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdF9zZWxmLnNldFJlc3VsdHNUZXh0KCcnKTtcclxuXHRcdF9zZWxmLnNldFJlc3VsdHNMaXN0KCcnLCcnKTtcclxuXHRcdF9zZWxmLmVuYWJsZVJlc3VsdHNMaXN0KGZhbHNlKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsaXR0bGVybFVpO1xyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3ctanMvbGl0dGxlcmwtdWkuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///3\n");

/***/ })
/******/ ]);