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

	console.log(instance.toString());
	
	instance.save(function (err,doc) {
		if(err) callback(err);
		else callback(null, {"status":"OK","new_id":doc._id});
	});
}

/**
 * Retrieve all messages for a user.  The messages are sorted by 
 * date in descending order (newest first).
 * Does case insensitive search by using regex.
 * 
 * NOTE: this is not efficient for large datasets as it does not 
 * invoke any indexes.
 * 
 * @param user 
 * @param callback 
 */
function RetrieveAllByUser(user, callback) {
	var regexUser = new RegExp(user, "i");
	modelMessage.find(
			{
				$or: [ { from: regexUser}, { to: regexUser} ]
			}).sort('-date').exec(callback);

}

/**
 * Delete all messages that match the from and to user.
 * Does case insensitive search by using regex.
 * 
 * NOTE: this is not efficient for large datasets as it does not 
 * 
 * invoke any indexes.
 * @param req
 * @param callback 
 */
function DeleteMessages(req, callback) {
	var regexFromUser = new RegExp(req.body.from, "i");
	var regexToUser = new RegExp(req.body.to, "i");

	modelMessage.remove( 
	    {
	    	$and: [ { from: regexFromUser }, { to: regexToUser } ]
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
 * Does case insensitive search by using regex.
 * 
 * NOTE: this is not efficient for large datasets as it does not 
 * invoke any indexes.
 * 
 * @param user 
 * @param callback 
 */
function RetrieveAllFromUser(user, callback) {
	var regexUser = new RegExp(user, "i");
	modelMessage.find({from: regexUser}).sort('-date').exec(callback);
}

/**
 * Retrieve all messages where from equals the from User and 
 * to equals the toUser.  The messages are sorted by 
 * date in descending order (newest first).
 * Does case insensitive search by using regex.
 * 
 * NOTE: this is not efficient for large datasets as it does not 
 * invoke any indexes.
 * 
 * @param fromUser 
 * @param toUser 
 * @param callback 
 */
function RetrieveAllToUser(fromUser, toUser, callback) {
	var regexFromUser = new RegExp(fromUser, "i");
	var regexToUser = new RegExp(toUser, "i");
	modelMessage.find(
			{
				$and: [ { from: regexFromUser }, { to: regexToUser } ]
			}).sort('-date').exec(callback);
}
