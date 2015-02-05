var http = require('http');
var fs = require('fs');

http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("Dog is running.");
	setTimeout(function(){
		response.write("Dog is done.");
		response.end();
	}, 5000);
}).listen(8080);

var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter();

logger.on('error', function(message){
	console.log('ERR: ' + message);
});

logger.emit('error', 'Spilled Milk');
logger.emit('error', 'Eggs Cracked');

request.on('readable', function(){
	var chunk = null;
	while (null !== (chunk = request.read())){
		response.write(chunk);
	}
});
request.on('end', function(){
	response.end();
}).listen(8080);

request.pipe(response);

var fs = require('fs');
var file = fs.createReadStream('readme.md');
var newFile = fs.createWriteStream("readme_copy.md");
file.pipe(newFile);

// File Upload
http.createServer(function(request, response){
	var newFile = fs.createWriteStream("readme_copy.md");
	var fileBytes = request.headers['content-length'];
	var uploadedBytes = 0;
	request.on('readable', function(){
		var chunk = null;
		while(null !== (chunk = request.read())){
			uploadedBytes += chunk.length;
			var progress = (uploadedBytes / fileBytes) * 100;
			response.write("progress: " + parseInt(progress, 10) + "%\n");
		}
	});
	request.pipe(newFile);
}).listen(8080);

// Modules
// custom_hello.js
var hello = function(){
	console.log("hello!");
}
module.exports = hello;
// app.js
var hello = require('./custom_hello');
hello();
// custom_goodbye.js
exports.goodbye = function(){
	console.log("bye!");
}

// Express
// npm install --save express -> saves it to dependencies file
var express = require('express');
var app = express();
app.get('/', function(request, response){
	response.sendFile(__dirname + "index.html");
});
app.get('/tweets/:username', function(req, response){
	var username = req.params.username;
	options = {
		protocol: "http",
		host: "api.twitter.com",
		pathname: "/1/statuses/user_timeline.json",
		query: {screen_name: username, count: 10}
	}
	var twitterUrl = url.format(options);
	request(twitterUrl).pipe(response);
})
app.listen(8080);

request(url, function(err, res, body){
	var tweets = JSON.parse(body);
	response.locals = {tweets: tweets, name: username};
	response.render('tweets.ejs');
});


// Socket.io
// npm install --save socket.io

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client){
	console.log("Client connected...");
	client.on('join', function(name){
		client.nickname = name;
	});
	client.emit('messages', {hello: 'world'});
	client.on('messages'), function(data){
		var nickname = client.nickname;
		client.broadcast.emit('message', nickname + ": " + data);
	});
});
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
server.listen(8080);

// Persisting Data
var messages = [];

var storeMessage = function(name, data){
	messages.push({name: name, data: data});
	if(messages.length > 10){
		messages.shift();
	}
}

messages.forEach(function(message){
	
})








































