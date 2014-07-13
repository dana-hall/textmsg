/**
 * Main app that loads the html page.
 * 
 * @module textMsgApp
 */
var textMsgApp = angular.module("textMsgApp", []);

textMsgApp.config(function($routeProvider) {
	console.log($routeProvider);
	$routeProvider.when("/",{controller: "MessagesCtrl", 
		                     templateUrl: "js/views/textMsgView.html"});
});
