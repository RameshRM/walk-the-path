walk-the-path
=============

A Walker Module, Iteratively traverses the file structure, and returns an array of files within the directory and subdirectory.

### Installation
=================

npm install "walk-the-path"

### Usage
==========

var walker = require("walk-the-path");
var options = {};
var done = function(err, result){};
walker.walk("./",options, done);