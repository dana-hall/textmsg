/**
 * Server Routing for the RESTful APIs for messages.
 * 
 * @module messages
 */
var express = require('express');

//
// Exported and used by the server for routing
//
exports.routes = function (app) {
	  Message  = require('../../server/models/messages');

	// Set routing prefix for api calls
	var router = express.Router();
	app.use('/textmsg', router);
	
	//**************************************************
	// These APIs are used by the html client.
	//**************************************************

	/**
	 * Routes to the create message api.  
	 * Used by send button.
	 */
	router.route('/create')
	  .post(function(req, res) {
	  Message.CreateMessage(req, function(err, success) {
		console.log("/create");
	    if(err) throw err;
	    else res.send(success);
	  });
	});
	
	/**
	 * Routes to the DeleteMessages api.
	 * This deletes all messages where fromUser 
	 * equals the from field and the toUser equals
	 * the to field.  
	 */
	router.route('/delete')
	  .post(function(req, res) { 
	  Message.DeleteMessages(req, function(err, success) {
		  console.log("/delete");
	    if(err) throw err;
	    else res.send(success);
	  });
	});

	/**
	 * Routes to the RetrieveAllByUser api.
	 * This retrieves all messages where user 
	 * equals the from or to fields.
	 * Used by the polling timer and login.  
	 */
	router.route('/read/all/:user')
	.get(function(req, res) { 
		Message.RetrieveAllByUser(req.params.user, function(err, success) {
			console.log("/read/all/"+req.params.user);
			if(err) throw err;
			else res.send(success);
		});
	});
	
	//**************************************************
	// These APIs were used during development only.
	// Postman was used to develop the server apart
	// from developing the client.
	//**************************************************
	/**
	 * Routes to the RetrieveAllFromUser api.
	 * This retrieves all messages where user 
	 * equals the from field.  
	 * Not used by the html.
	 * Only used by Postman. 
	 */
	router.route('/read/from/:user')
	.get(function(req, res) { 
		Message.RetrieveAllFromUser(req.params.user, function(err, success) {
			console.log("/read/from/"+req.params.user);
			if(err) throw err;
			else res.send(success);
		});
	});
	
	/**
	 * Routes to the RetrieveAllToUser api.
	 * This retrieves all messages where fromUser 
	 * equals the from field and the toUser equals
	 * the to field.  
	 * Not used by the html.
	 * Only used by Postman. 
	 */
	router.route('/read/from/:fromUser/to/:toUser')
	.get(function(req, res) { 
		Message.RetrieveAllToUser(req.params.fromUser, req.params.toUser, function(err, success) {
			console.log("/read/from/"+req.params.fromUser+"/to/"+req.params.toUser);
			if(err) throw err;
			else res.send(success);
		});
	});
	
	/**
	 * Routes to the retrieve all message api. 
	 * Reads all messages in the document. 
	 * Not used by the html.  Only used by Postman.
	 */
	router.route('/read')
	    .get( function(req, res) { 
		Message.RetrieveAll(function(err, success) {
			console.log("/read");
			if(err) throw err;
			else res.send(success);
		});
	});
	
};
