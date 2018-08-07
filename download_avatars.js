var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');
var projectOwner = process.argv[2];
var projectName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

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

getRepoContributors(projectOwner, projectName, function(err, result) {
  if (projectOwner && projectName){
    result.forEach(function(i){
      console.log(i.login);
      console.log(i.avatar_url);
      downloadImageByURL(i.avatar_url, `./${i.login}.jpg`);
    })
  } else {
    console.log("Arguments are not specify")
   }
 });




