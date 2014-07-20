'use strict';
var fs = require("fs");
var path = require("path");
var esprima = require('esprima');

var results = [];
var filterhidden = true;
var deepnest = true;

function walkThePath(dir, callback) {
  var i = 0;
  fs.readdir(dir, function(err, files) {
    if (err) {
      return callback(err);
    }
    (function getNext() {
      var file = files[i++];
      if (filterhidden && isHiddenFile(files[i])) {
        getNext.call();
        return;
      }

      if (typeof file === "undefined") {
        return callback(err, results);
      } else {
        file = dir + '/' + file;
        fs.stat(file, function(err, stat) {
          if (deepnest && stat.isDirectory()) {
            walkThePath(file, callback);
            getNext();
          } else {
            results.push(getFullFilePath(file));
            getNext();
          }

        });
      }
    }).call(this);
  });

}

function getFullFilePath(fileName) {
  return path.resolve(fileName);
}

function isHiddenFile(fileName){
  return (/^\./.test(fileName));
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = {
    'walk': function(fileDir, options, done) {
      deepnest = options.deepnest || deepnest;
      filterhidden = options.filterhidden || filterhidden;

      walkThePath("./test", function(err, result) {
        done(err, result);
      });

    }
  };
}

