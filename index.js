"use strict";

var QIITA_URL = "http://qiita.com/";

var cheerio = require('cheerio');
var request = require('request');
var Promise = require('bluebird');

var argv = require('minimist')(process.argv.slice(2));

if (!argv.u && !argv.o) {
  console.log("Usage: qiitarace -u user1,user2,...");
  console.log("Usage: qiitarace -o organization");
  return
}

new Promise(function(resolve, reject) {
  if (argv.u) {
    return resolve(argv.u.split(","));
  }
  if (argv.o) {
    request(QIITA_URL + "organizations/" + argv.o, function(err, res, body) {
      if (err) return reject(err);

      var $ = cheerio.load(body);
      return resolve($('img.organizationMemberIcons_icon').map(function(i, elem) {
        return $(this).attr('title');
      }).get());
    });
  }
})
.then(function(users) {
  return Promise.settle(users.map(function(user) {
    return new Promise(function(resolve, reject) {
      request(QIITA_URL + user, function(err, res, body) {
        if (err) return reject(err);

        var $ = cheerio.load(body);

        return resolve({
          user: user,
          score: parseInt($('span.userPage_contributionCount').text(), 10)
        });
      });
    });
  }))
})
.then(function(results) {
  results
  .filter(function(result) {
      return result.isFulfilled();
    })
  .map(function(result) {
    return result.value();
  })
  .sort(function(a, b) {
    return a.score < b.score;
  })
  .forEach(function(result) {
    console.log("%s\t%d", result.user, result.score);
  });
})
.catch(function(err) {
  console.log(err);
});
