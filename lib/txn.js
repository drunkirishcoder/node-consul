/**
 * Key/Value store
 */

'use strict';

/**
 * Module dependencies.
 */

var utils = require('./utils');

/**
 * Initialize a new `Txn` client.
 */

function Txn(consul) {
  this.consul = consul;
}

/**
 * Submit
 */

Txn.prototype.submit = function(ops, callback) {
  var options;

  if (arguments.length === 3) {
    options = arguments[1];
    callback = arguments[2];
  }

  if (!Array.isArray(ops)) {
    ops = [ops];
  }

  options = utils.normalizeKeys(options);
  options = utils.defaults(options, this.consul._defaults);

  var req = {
    name: 'txn.put',
    path: '/txn',
    query: {},
    type: 'json',
    body: ops
  };

  utils.options(req, options);

  ops.forEach(function(op) {
    if (op.KV && op.KV.Value) {
      op.KV.Value = utils.encode(op.KV.Value);
    }
  });

  this.consul._put(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.Txn = Txn;
