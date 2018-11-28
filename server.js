var fs = require("fs");
var host = "localhost";
var port = 3000;
var express = require("express");
var path = require("path");

var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get("*", function(request, response){ //root dir
  var filename = path.join(process.cwd(), request.path);

  console.log('asdasd', request.path, filename);

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.sendFile("404.html");
    }else{
      response.sendFile(filename);
    }
  });
});

app.listen(port, host);
