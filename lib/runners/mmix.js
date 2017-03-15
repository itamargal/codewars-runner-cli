var shovel = require('../shovel'),
    util = require('../util'),
    exec = require('child_process').exec,
    path = require('path');

module.exports.run = function run(opts, cb) {
    shovel.start(opts, cb, {
        testIntegration: function (runCode, fail) {
            doit(opts, runCode, fail);
        },
        solutionOnly: function (runCode, fail) {
            doit(opts, runCode, fail);
        },
        sanitizeStdErr: function(error) {
            return error;
        }
    });
};

function doit(opts, runCode, fail) {
    var mmo_file = path.join(opts.dir, 'solution.mmo'),
        code = [
            opts.setup,
            opts.solution,
            opts.fixture || ""
        ].join('\n');

    var solution_file = util.codeWriteSync('mmix', code, opts.dir, 'solution.mms'),
        mmixal_cmd = ['mmixal', solution_file];

    exec(mmixal_cmd.join(' '), function (error, stdout, stderr) {
        if (error) return fail(error, stdout, stderr);
        opts.publish('stdout', stdout);
        runCode({'name': 'mmix', 'args': [mmo_file]});
    });
}
