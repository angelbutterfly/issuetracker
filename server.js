const
  http = require('http'),
  fs = require('fs'),
  url = require('url'),
  path = require('path');


var server = http.createServer(function(request, response) {

	//Check (and extract) only pathname. Eg.: "/index.html" extracted from "http://localhost/index.html" sent to nodejs by browser
    var uri = url.parse(request.url).pathname;

    //The http (nodejs) server never knows WHERE is the file to serve. So you have to help him, informing the correct path+filename. In this case, using RELATIVE paths.
    //**** Check: http://dorkage.net/files/uploads/url.gif
	var filename = path.join("html", uri);

	//If file exists, return it to browser. If file does NOT exist (or any other exception), return an error.
    fs.readFile(filename, 'binary', function(err, file) {
        if(!err){
        	//File exists: return file to user, and do not write any log
            response.writeHead(200);
            response.write(file, 'binary');
            response.end();
			console.log(filename+": OK");
        }else{
        	if(err.code==="ENOENT"){
        		//File or path not found
	            response.writeHead(404);
	            response.end("File not found " + uri);
	            console.log(filename+": ERROR: File not found");
	        }else{
	        	response.writeHead(500);
	            response.end("Error: "+err.code);
	            console.log(filename+": ERROR: other");
	        }
        }
    });
});


  server.listen((process.env.PORT || 5000), function(o){
	var instance = this;
	console.log("NodeJS Server: listening for Http Requests at ["+instance._connectionKey+"]");
	console.log("-----------------------------------------------------------------");

});
