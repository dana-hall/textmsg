/**
 * Database Configuration.  This holds the connection info 
 * to the database.
 * 
 * This defines the database as being localhost with
 * the document named textmsgnode. 
 * 
 * @module db
 */
var mongoose = require('mongoose');
	
/**
 * Export
 */
exports.connect = function () {
	mongoose.connect('mongodb://localhost/textmsgnode');
};