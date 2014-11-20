// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers');
var http = require('http-request');
var fs = require('fs');

fs.readFile(archive.paths.list, "utf-8", function(err,data) {
  var dataArr = data.split('\n');

  dataArr.forEach(function(url){
    exports.scrapeUrl(url);
  })
});

exports.scrapeUrl = function(getUrl) {
  http.get({
    url: 'http://' + getUrl,
    progress: function (current, total) {
      console.log('downloaded %d bytes from %d', current, total);
    }
  }, archive.paths.archivedSites + "/" + getUrl, function (err, res) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res.code, res.headers, res.file);
  });
};
