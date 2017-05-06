var shovel = require('../shovel'),
    util = require('../util'),
    config = require('../config');

module.exports.run = function run(opts, cb) {
    shovel.start(opts, cb, {
        solutionOnly: function (runCode) {
          runCode({ name: 'echo', 'args': [ '<DESCRIBE::> This is something' ] });
        },
        testIntegration: function (runCode) {
          runCode({ name: 'echo', 'args': [ 'test integration' ] })
        }
    });
};
