'use strict';

/**
 * Module dependencies.
 */

var should = require('should');

var helper = require('./helper');

/**
 * Tests
 */

helper.describe('Txn', function() {
  before(function(done) {
    helper.before(this, done);
  });

  after(function(done) {
    helper.after(this, done);
  });

  describe('submit', function() {
    it('should apply changes', function(done) {
      var c = this.c1;
      var key = 'one';
      var value = 'two';

      var ops = [
        { KV: { Verb: 'set', Key: key, Value: value } }
      ];

      c.txn.submit(ops, function(err, ok) {
        should.not.exist(err);

        ok.should.be.true;

        c.kv.get(key, function(err, data) {
          should.not.exist(err);

          data.Value.should.eql(value);

          done();
        });
      });
    });
  });
});
