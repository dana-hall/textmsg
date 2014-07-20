textmsg
=======

Simple Text Message Demo

Overview
This is a demo that uses the MEAN stack to demo a very simple text messaging concept.

Features
1) Demonstrates text messaging with multiple users using a web browser.
2) Allows deleting of messages by entering a name in the to field.
3) Auto polling for new messages every 10 seconds.  No need to refresh.
4) Uses RESTful APIs for the server.
5) Messages are displayed with newest on top.


Prerequisites
1) NodeJs must be installed
2) MongoDB must be installed
3) Mongoose must be installed.  This is the layer that provides connections to the database.
4) Express must be installed.  This is used on the server side for routing.

To Run
1) Start a terminal
2) Enter mongod (this will start the mongo database)
3) Start another terminal
4) cd to directory where the sever.js is located
5) Enter node server (this will start the server.  Note the port.)
6) Start a browser and enter http://localhost:8090 (this will start the initial screen)
7) Enter a name and press the Login button
8) Enter another name in the to field 
9) Enter a message and press Send
10) Repeat steps 6 thru 9 in a different browser.  Login with the to name from first window
    and messages should appear.

Limitations
1) Shares a single document in the database for all messages.
2) If userA deletes messages from userB, they will also disappear from userB's screen
3) Uses a 10 second timer to poll for new messages.  It would be better to use something like WebSockets.
4) Not a true login.  This is simply a mimic to start the message polling.
5) Searches are case sensitive.  So if a name is mistyped it is seen as a new user.

Design Decisions
1) Use of the MEAN stack as it is something I am trying to learn and it is lightweight and fast to develop in.
2) I did consider using JMS on the back end but this paradigm, I felt, did not meet the requirements of a text
   message product.  The JMS paradigm is more suited for something like chat.  In the JMS world messages are not
   stored but meant to be transient.  This is not what, I feel, is what is done in a text message environment.
3) Use of a single document that is shared by all users.  This is really one of expediency and needed to fit 07
   within the scope of the requirements.

Improvements
1) Modify so that when a user deletes messages, it does not affect other users.  This could be accomplished by:
    a) Create a separate document for each user so each message would be discreet.
   	b) Add authentication and add this to the record so unless this token was present the record would not 
   	   be deleted 
2) Create two display tables, one for received messages and one for sent messages.  This would be fine for the 
   web page but would not be a good interface for mobile.
3) Allow grouping of messages by from and to.  Basically group the conversations together.

References
These are some websites that I used to learn and build this demo from.  The code is mine as I have rewritten
and modified alot of it to suit these purposes.  But I could not have done this without learning from these sites
so I wanted to give credit where due.  The routing layouts, directory strucutre seem to be what I saw as best
practices.  I rewrote the I/O queries to do reading on multiple fields and to do sorting by date.
http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/
http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
http://nodeguide.com/
http://www.nodebeginner.org/
http://bardevblog.wordpress.com/2013/08/14/understanding-angularjs-simple-example/
http://toddmotto.com/ultimate-guide-to-learning-angular-js-in-one-day/
http://www.ng-newsletter.com/posts/beginner2expert-how_to_start.html
http://weblogs.asp.net/dwahlin/using-an-angularjs-factory-to-interact-with-a-restful-service

Change Log
2014-07-19 - added case insensitivity to queries and delete.  This applies to web interface and Postman.
Modified server/models/messages.js

2014-07-20 - modified schema to set the date field to default of current date.  Removed setting of date in messagesService.
Modified
 	js/services/messagesService.js
 	server/models/db.js
 	server/models/messages.js
 	

