"use strict";
const config = require ("./config")
const request = require("request");
const http = require("https");
const fs = require("fs");

const GITHUB_USER = config["username"];
const GITHUB_TOKEN = config["token"];

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  const requestURL = `https:// ${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  request.get({
    url: requestURL,
    headers: {
      "User-Agent": "Me"
    }
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body)
      cb(data);
    } else {
      console.log(error);
      console.log(response);
    }
  });
};

function downloadImageByURL(url, filepath)  {
  request.get(url)
     .on("error", function (err) {
     console.log(err);
    })
    .on("response", function (response) {
     console.log(response.statusMessage, response.headers["content-type"]);
    })
    .pipe(fs.createWriteStream(filepath));
};

let owner = process.argv[2];
let repo = process.argv[3];
// const ownerRepo = process.argv.slice(-2);
getRepoContributors(owner, repo, function (url) {
  url.forEach(function (element) {
    let url = element.avatar_url;
    let filepath = `./avatars/${element.login}.jpg`;

    // console.log(avatar_url, filepath);
    downloadImageByURL(avatar_url, filepath);
    // console.log(element["avatar_url"]);
  })
});



// getRepoContributors("jquery", "jquery", function (url) {
//   url.forEach(function (element) {
//     let url = element.avatar_url
//     let filepath = `./avatars/${element.login}.jpg`

//     console.log(url, filepath)
//     downloadImageByURL(url, filepath)
//     console.log(element["avatar_url"]);
//   })
// })
