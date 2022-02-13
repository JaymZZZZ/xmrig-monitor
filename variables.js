/**
 * Thank you for using the XMRig Monitor! If you have any
 * troubles, please open an issue on GitHub and I'll see what
 * I can do: https://github.com/JaymZZZZ/xmrig-monitor
 *
 * This is the setup file. The only required information is
 * the API Endpoint address.
 *
 */

var endpointAPI = "https://URL-HERE"; 	// (required) your API Endpoint address goes here. e.g. http://192.168.1.5:11000/ or http://myproxydomain.org:8080/
var endpointAPIAuthToken = "<YOUR_API_TOKEN>"; // (optional, but recommended) Set an API key for your API so that you're not open to the public!!!
var timer = 60; 								// (optional) integrated timer for auto-refreshing the page (value in seconds). set to 0 if you don't want to auto-refresh
var alarmThreshold = 0; 						// (optional) if the 10-seconds average goes below this number, your tab will play a sound and an alert (for proxy it looks at the 60-minutes average)
var aggregateThreads = 0; 						// (optional) if you're using AMD Radeon Vega and you want to see one card per row (each card has two threads) change this to '1'
//DO NOT EDIT BELOW
var endpointAPIsummary = endpointAPI + "/2/summary";
var endpointAPIbackends = endpointAPI + "/2/backends";
var endpointAPIconfig = endpointAPI + "/2/config";
