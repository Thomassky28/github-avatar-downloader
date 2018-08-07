var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var secrets = require('./secrets');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }

  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    cb(err, data);
  });
}

function downloadImageByURL(url, filePath) {
    request.get(url)
           .pipe(fs.createWriteStream(filePath))
}

getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach(function(i){
    console.log(i.login);
    console.log(i.avatar_url);
    downloadImageByURL(i.avatar_url, `./${i.login}.jpg`);
  })

  // console.log("Errors:", err);
  // console.log("Result:", result);
});




