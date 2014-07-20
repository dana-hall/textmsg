/**
 * Client Service for the RESTful APIs for messages.
 * 
 * @module messagesService
 */
textMsgApp.factory("messagesService", function($http) {

	// Holds the results.  Data bound to the display
	var _messages = [];
    
	// URL base for the REST APIs
	var urlBase = '/textmsg';

    /**
    * Read all messages for a user
    */
	var _getAllMessagesByUser = function(user) {
		console.log(urlBase +"/read/all/"+user);
		$http.get(urlBase +"/read/all/"+user)
		.then(function(results){
			console.log("Success read all messages for user: "+results);
			_messages.length = 0;					// truncate the user array
			angular.copy(results.data, _messages);	// add results to the messages array
		}, function(results){
			console.log("Error: "+results);
		})
	}

	/**
	 * Create a new message
	 * NOTE: the date field is set in the schema with a default of current date
	 */
    var _sendMessage = function(from, to, message) {
        var message = {
            "from": from,
            "to": to,
            "message": message
        };

        $http.post(urlBase+"/create", message)
		.then(function(results){
			console.log("Success add new user: "+results);
			_messages.splice(0, 0, message);	// add the new message to the messages array
		}, function(results){
			//Error
			console.log("Error: "+results);
		})
    }
 
    /**
     * Delete all messages that match the from or to user 
     * passed in the parameters.
     */
    var _deleteMessages = function(from, to) {
       	var message = {
    			"from": from,
    			"to": to
    	};
 
       	$http.post(urlBase+"/delete", message)
    	.then(function(results){
    		console.log("Success deleting messages: "+results);
    	}, function(results){
    		console.log("Error: "+results);
    	})
    }

    /**
     * Defines all the exports.
     */
    return{
        messages: _messages,
        getAllMessagesByUser: _getAllMessagesByUser,
        deleteMessages: _deleteMessages,
        sendMessage: _sendMessage
    };
});
