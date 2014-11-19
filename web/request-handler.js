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
  console.log(url)
  if(req.method == "GET") {
    res.writeHead(200, httpHelper.headers);
    httpHelper.serveAssets(res, url)
  }


};
