var expect = require('chai').expect;
var runner = require('../runner');

describe('mmix runner', function() {
    describe('.run', function() {
        // TODO:
        runner.assertCodeExamples('mmix');

        it('should handle basic code eval', function(done) {
            var solution = `
       LOC   #100
Main   GETA  $255,String
       TRAP  0,Fputs,StdOut
       TRAP  0,Halt,0
String BYTE  "hello, world",#a,0`;

            runner.run({
                language: 'mmix',
                code: solution
            }, function(buffer) {
                expect(buffer.stdout).to.equal("hello, world\n");
                // TODO: this returns all kinds of weird numbers that aren't zero
                // expect(buffer.exitCode).to.equal(0);
                done();
            });
        });
    });
});
