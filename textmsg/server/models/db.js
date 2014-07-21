/**
 * Database Model/Schema.  This defines the database document.
 * 
 * @module db
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Document definition for the JSON Message.
 */
var Messages = new Schema({
	from: {type: String, required: true},
	to: {type: String, required: true},
	date: {type: Date, required: true, "default": Date.now},
	message: {type: String, required: true}
});

/**
 * Exports
 */
module.exports.mongoose 		= mongoose;
module.exports.SchemaMessages	= Messages;
