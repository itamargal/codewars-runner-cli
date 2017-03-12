var shovel = require('../shovel'),
    util = require('../util'),
    exec = require('child_process').exec,
    path = require('path');

module.exports.run = function run(opts, cb) {
    shovel.start(opts, cb, {
        testIntegration: function (runCode, fail) {
            throw new Error('Test framework is not supported');
        },
        solutionOnly: function (runCode, fail) {
            var mmo_file = path.join(opts.dir, 'solution.mmo'),
                code = [
                    opts.setup,
                    opts.solution,
                    opts.fixture
                ].join('\n');

            var solution_file = util.codeWriteSync('mmix', code, opts.dir, 'solution.mms'),
                mmixal_cmd = ['mmixal', solution_file];

            exec(mmixal_cmd.join(' '), function (error, stdout, stderr) {
                if (error) return fail(error, stdout, stderr);
                opts.publish('stdout', stdout);
                runCode({'name': 'mmix', 'args': [mmo_file]});
            });
        },
        sanitizeStdErr: function(error) {
            return error;
        }
    });
};
