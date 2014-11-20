var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js')
var fs = require('fs');
// require more modules/folders here!

var urlLookup = {
  "/": "index.html"
}

exports.handleRequest = function (req, res) {
  var url = req.url
  if (url === '/') {
    url = '/index.html';
  }
  if(req.method === "GET") {
    fs.readFile(archive.paths.list, 'utf8' ,function(err, data) {
      console.log(archive.paths.list);
      if(String.prototype.indexOf.call(data, url.slice(1)) > -1 || req.url === '/'){
        res.writeHead(200, httpHelper.headers);
        httpHelper.serveAssets(res, url);
      } else {
        res.writeHead(404, httpHelper.headers);
        res.end();
      }
    });
  } else if (req.method === "POST") {
    res.writeHead(302, httpHelper.headers);
    req.on('data', function(chunk){
      var newChunk = chunk.slice(4)+'\n';
      fs.appendFile(archive.paths.list, newChunk);
    });
    res.end();
  }



};
