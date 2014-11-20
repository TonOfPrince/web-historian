var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
var fs = require('fs');
var htmlFetcher = require('../workers/htmlfetcher')
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
    if(archive.isURLArchived(url) || req.url === '/'){
      res.writeHead(200, httpHelper.headers);
      httpHelper.serveAssets(res, url);
    } else {
      res.writeHead(404, httpHelper.headers);
      res.end();
    }
  } else if (req.method === "POST") {
    res.writeHead(302, httpHelper.headers);
    req.on('data', function(chunk){

      var newChunk = chunk.toString().slice(4)
      console.log(archive.isURLArchived(newChunk));
      if(archive.isURLArchived(newChunk)){
        httpHelper.serveAssets(res, "/" + newChunk);
      } else {
        newChunk =  newChunk +'\n';
        fs.appendFile(archive.paths.list, newChunk);
        httpHelper.serveAssets(res, '/loading.html');
      }

    });
    //res.end();
  }



};
