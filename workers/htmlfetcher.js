// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers');
var http = require('http-request');
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
