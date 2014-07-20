'use strict';

var filePath = "./test";
var walker = require('../lib/walker');
var expector = require('chai').expect;

describe('walk current directory', function() {
    it('should return 1 files', function() {
        walker.walk(filePath,{}, function(err, result){
            expector(result.length).to.equal(1);
        });
    });
});

