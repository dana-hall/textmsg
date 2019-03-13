# textmsg

## Simple Text Message Demo

### Overview

This is a demo that uses the MEAN stack to demo a very simple text messaging concept.

### Features

- Demonstrates text messaging with multiple users using a web browser.
- Allows deleting of messages by entering a name in the to field.
- Auto polling for new messages every 10 seconds. No need to refresh.
- Uses RESTful APIs for the server.
- Messages are displayed with newest on top.

### Prerequisites

- NodeJs must be installed
- MongoDB must be installed
- Mongoose must be installed. This is the layer that provides connections to the database.
- Express must be installed. This is used on the server side for routing.
- The needed modules will be in the package.json. To install Mongoose and Express enter from the commandline: npm install

### To Run

1. Start a terminal
2. Enter mongod (this will start the mongo database)
3. Start another terminal
4. cd to directory where the sever.js is located
5. Enter node server (this will start the server. Note the port.). Or enter: npm start
6. Start a browser and enter http://localhost:8090 (this will start the initial screen)
7. Enter a name and press the Login button
8. Enter another name in the to field
9. Enter a message and press Send
10. Repeat steps 6 thru 9 in a different browser. Login with the to name from first window and messages should appear.

### Limitations

- Shares a single document in the database for all messages.
- If userA deletes messages from userB, they will also disappear from userB's screen
- Uses a 10 second timer to poll for new messages. It would be better to use something like WebSockets.
- Not a true login. This is simply a mimic to start the message polling.
- Searches are case sensitive. So if a name is mistyped it is seen as a new user.

### Design Decisions

- Use of the MEAN stack as it is something I am trying to learn and it is lightweight and fast to develop in.
- I did consider using JMS on the back end but this paradigm, I felt, did not meet the requirements of a text message product. The JMS paradigm is more suited for something like chat. In the JMS world messages are not stored but meant to be transient. This is not what, I feel, is what is done in a text message environment.
- Use of a single document that is shared by all users. This is really one of expediency and needed to fit within the scope of the requirements.

### Improvements

- Modify so that when a user deletes messages, it does not affect other users. This could be accomplished by:
  - Create a separate document for each user so each message would be discreet.
  - Add authentication and add this to the record so unless this token was present the record would not be deleted
- Create two display tables, one for received messages and one for sent messages. This would be fine for the web page but would not be a good interface for mobile.
- Allow grouping of messages by from and to. Basically group the conversations together.

### References

These are some websites that I used to learn and build this demo from. The code is mine as I have rewritten
and modified alot of it to suit these purposes. But I could not have done this without learning from these sites
so I wanted to give credit where due. The routing layouts, directory strucutre seem to be what I saw as best
practices. I rewrote the I/O queries to do reading on multiple fields and to do sorting by date.

- http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/
- http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
- http://nodeguide.com/
- http://www.nodebeginner.org/
- http://bardevblog.wordpress.com/2013/08/14/understanding-angularjs-simple-example/
- http://toddmotto.com/ultimate-guide-to-learning-angular-js-in-one-day/
- http://www.ng-newsletter.com/posts/beginner2expert-how_to_start.html

### Change Log

2014-07-19 - added case insensitivity to queries and delete. This applies to web interface and Postman.

- server/models/messages.js

2014-07-20 - modified schema to set the date field to default of current date. Removed setting of date in messagesService.

- js/services/messagesService.js
- server/models/db.js
- server/models/messages.js

2014-07-20 - modified messageServices to display the current date immediately. Without this the date field is blank until a refresh occurs.

- js/services/messagesService.js

2014-07-20 - added required: true to date in schema.

- server/models/db.js

2016-03-22 - added markdown tags.

- readme.md
