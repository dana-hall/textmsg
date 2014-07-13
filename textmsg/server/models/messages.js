/**
 * Database Model DAO for the RESTful APIs for messages.
 * 
 * @module messages
 */
var db = require('./db');
var modelMessage = db.mongoose.model('Messages', db.SchemaMessages);

/**
 * Exports
 */
module.exports.CreateMessage = CreateMessage;
module.exports.RetrieveAllByUser = RetrieveAllByUser;
module.exports.DeleteMessages = DeleteMessages;

module.exports.RetrieveAll = RetrieveAll;
module.exports.RetrieveAllFromUser = RetrieveAllFromUser;
module.exports.RetrieveAllToUser = RetrieveAllToUser;


//**************************************************
// These APIs are used by the html client.
//**************************************************

/**
 * Create a message.  This will add a message to the database and 
 * populate the from, to, date and message fields passed in from the request.
 * Used by the send button.
 * 
 * @param req 
 * @param callback 
 */
function CreateMessage(req, callback) {
	var instance  = new modelMessage();
	instance.from = req.body.from;
	instance.to	  = req.body.to;
	instance.message = req.body.message;

	// Accommodation for Postman rest client for testing 
	// as we can't put a date in the field
	if(req.body.date != null) {
		instance.date = req.body.date;
	}
	else {
		instance.date = Date.now();
	}
	
	console.log(instance.toString());
	
	instance.save(function (err,doc) {
		if(err) callback(err);
		else callback(null, {"status":"OK","new_id":doc._id});
	});
}

/**
 * Retrieve all messages for a user.  The messages are sorted by 
 * date in descending order (newest first).
 * 
 * @param user 
 * @param callback 
 */
function RetrieveAllByUser(user, callback) {
	modelMessage.find(
			{
				$or: [ { from: user }, { to: user } ]
			}).sort('-date').exec(callback);
}

/**
 * Delete all messages that match the from and to user.
 * 
 * @param req
 * @param callback 
 */
function DeleteMessages(req, callback) {
	var fromUser = req.body.from;
	var toUser   = req.body.to;

	modelMessage.remove( 
	    {
	    	$and: [ { from: fromUser }, { to: toUser } ]
		}, function (err) {
		if(err) callback(err);
		else callback(null, {"status":"OK"});
	});
}

//**************************************************
// These APIs were used during development only.
// Postman was used to develop the server apart
// from developing the client.
//**************************************************

/**
 * Retrieve all messages.
 * 
 * @param callback 
 */
function RetrieveAll(callback) {
	modelMessage.find({}).sort('-date').exec(callback);
}

/**
 * Retrieve all messages from a user.  The messages are sorted by 
 * date in descending order (newest first).
 * 
 * @param user 
 * @param callback 
 */
function RetrieveAllFromUser(user, callback) {
	modelMessage.find({from: user}).sort('-date').exec(callback);
}

/**
 * Retrieve all messages where from equals the from User and 
 * to equals the toUser.  The messages are sorted by 
 * date in descending order (newest first).
 * 
 * @param fromUser 
 * @param toUser 
 * @param callback 
 */
function RetrieveAllToUser(fromUser, toUser, callback) {
	modelMessage.find(
			{
				$and: [ { from: fromUser }, { to: toUser } ]
			}).sort('-date').exec(callback);
}
