var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  var filePath = '.' + req.url;
  filePath = filePath.split("/");


  if (filePath[1] === ""||filePath[1] === "index.html") {
    serveFile("./index.html", res);

  } else if (filePath[1] === "site2") {
    serveFile("./site2.html", res);

  } else {
    serveFile("./errors.html", res);
  }

  // Function to serve a file to the client
  function serveFile(filePath, res) {
    fs.readFile(filePath, function(err, data) {
      if (err) {

        // If there's an error reading the file, respond with a 404 error
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('404 Not Found');
        console.log('Error reading file:', filePath);
      } else {

        // If the file is read successfully, respond with the file content
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        console.log('Serving file:', filePath);
      }

      // End the response
      return res.end();
    });
  }

}).listen(3000, () => {
  console.log('Server is listening on port 3000');
});

