'use strict';

/**
 * Module dependencies.
 */

var should = require('should');

var helper = require('./helper');

/**
 * Tests
 */

describe('Txn', function() {
  helper.setup(this);

  describe('submit', function() {
    it('should work', function(done) {
      this.nock
        .put('/v1/txn')
        .reply(200, { ok: true });

      var op = { KV: { Verb: 'get', Key: 'key1' } };

      this.consul.txn.submit(op, function(err, data) {
        should.not.exist(err);

        should(data).eql({ ok: true });

        done();
      });
    });

    it('should work with 3 arguments', function(done) {
      this.nock
        .put('/v1/txn?dc=dc1')
        .reply(200, { ok: true });

      var opts = { dc: 'dc1' };

      var op = { KV: { Verb: 'get', Key: 'key1' } };

      this.consul.txn.submit(op, opts, function(err, data) {
        should.not.exist(err);

        should(data).eql({ ok: true });

        done();
      });
    });

    it('should work with multiple ops', function(done) {
      this.nock
        .put('/v1/txn')
        .reply(200, { ok: true });

      var ops = [
        { KV: { Verb: 'get', Key: 'key1' } },
        { KV: { Verb: 'get', Key: 'key2' } },
      ];

      this.consul.txn.submit(ops, function(err, data) {
        should.not.exist(err);

        should(data).eql({ ok: true });

        done();
      });
    });

    it('should encode values', function(done) {
      this.nock
        .put('/v1/txn', function(body) {
          return body[0].KV.Value === 'dmFsdWUx';
        })
        .reply(200, { ok: true });

      var op = { KV: { Verb: 'set', Key: 'key1', Value: 'value1' } };

      this.consul.txn.submit(op, function(err, data) {
        should.not.exist(err);

        should(data).eql({ ok: true });

        done();
      });
    });
  });
});
