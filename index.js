"use strict";

var QIITA_URL = "http://qiita.com/";

var cheerio = require('cheerio');
var request = require('request');
var Promise = require('bluebird');

var users = ["gologo13", "ktsukago",
"dai___chi",
"uny",
"m_nakamura145",
"haijima",
"nabenabeq",];
var results = [];

Promise
.settle(users.map(function(user) {
  return new Promise(function (resolve, reject) {
    request(QIITA_URL + user, function(err, res, body) {
      if (err) return reject(err);

      var $ = cheerio.load(body);

      return resolve({
        user: user,
        score: $('span.userPage_contributionCount').text()
      });
    });
  });
}))
.then(function(results) {
  results
  .filter(function(result) {
    return result.isFulfilled();
  })
  .map(function(result) {
    return result.value();
  })
  .sort(function(a, b) {
    return parseInt(a["score"], 10) < parseInt(b["score"], 10);
  })
  .forEach(function(result) {
    console.log("%s\t%d", result.user, result.score);
  });
})
.catch(function(err) {
  console.log(err);
});
