/**
 * Provides the link with the html page.  Using data binding, the 
 * actions are performed and data that is received from the server 
 * is loaded to the html page. 
 * 
 * @module messagesCtrl
 */
textMsgApp.controller("MessagesCtrl", function ($scope, messagesService) {
    
	/**
	 * Data binding to the messages array in the services
	 * to the html page
	 */
    $scope.messages = messagesService.messages;

    /**
     * Creates a message.
     * Executes when the Send button is clicked.
     * Also the from and to fields are checked for content.
     * If either is empty, an alert is displayed.
     */
    $scope.sendMessage = function(from, to, message) {
    	if(from && from != '' && to && to != '' && message && message != '') {
    		messagesService.sendMessage(from, to, message);
    	}
    	else {
    		alert("The From, To and Message fields must not be empty.  Please check your fields and try again.");
    	}
    }

    /**
    * Read all messages for a user
    * If the to user is empty, all messages for the from user will be display.
    * If the to user is not empty, only messages to the user will be displayed.
    * Executes when the the Login button is clicked and called by the
    * pollMessages().
    * Also the from variable is loaded for use by pollMessages(). 
    */
    $scope.getAllMessages = function(user) {
    	if(user && user != '') {
    		from = user;
    		messagesService.getAllMessagesByUser(user);
    	}
    	else {
    		alert("The From field is empty.  Please enter a name.");
    	}
    }

    /**
    * Delete all messages for a user where the from equals the fromUser and the 
    * to equals the toUser. 
    * Both the to and from fields must not be empty.  If one or both are empty
    * an alert is displayed.
    * Executes when the Delete button is clicked
    */
    $scope.deleteMessages = function(fromUser, toUser) {
    	if(fromUser && fromUser != '' && toUser && toUser != '') {
   			messagesService.deleteMessages(fromUser, toUser);
   			// NOTE: this could be improved.  A read is done to rebuild the 
   			// messages array.  It would be better to filter out the deleted 
   			// records from the array rather than an extra I/O.  But this 
   			// is quick and will work for now.
   			messagesService.getAllMessagesByUser(from);
    	}
    	else {
    		alert("The From or the To field is empty.  Both must be filled.  Please try again.");
    	}
    }
    
    /**
     * Loaded by the getAllMessages call and used by the pollMessages
     * to fetch messages for the user.
     */
    var from;

    /**
     * Fetches messages for the user.  The variable from is used.
     * This is loaded by the getAllMessages when the login 
     * button is clicked.  This will then load the display with
     * any new messages.
     */
	var pollMessages = function() {
    	if(from && from != '') {
   			messagesService.getAllMessagesByUser(from);
    	}
	};
  
	/**
	 * Starts the pollMessages which is called every 10 seconds.
	 */
	var timer = setInterval(function() {
		$scope.$apply(pollMessages);
	}, 10000);
	    
});
