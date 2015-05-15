"use strict";

var scraper = require('scraper')

var QIITA_URL = "http://qiita.com/"

var QiitaScraper = {}

/**
 * execute scraping for Qiita
 */
QiitaScraper.scrape = function(accounts, targets) {
  scraper(QIITA_URL + "/gologo13", function(err, $) {
    if (err) {
      throw err;
    }
    console.log($)
  });
}

module.exports = QiitaScraper
