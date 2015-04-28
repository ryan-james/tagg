'use strict';

var _ = require('lodash');
var Tagg = require('./tagg.model');

// Get list of taggs
exports.index = function(req, res) {
  Tagg.find().populate('tag').exec(function (err, taggs) {
    if(err) { return handleError(res, err); }
    return res.json(200, taggs);
  });
};

// Get a single tagg
exports.show = function(req, res) {
  Tagg.findById(req.params.id, function (err, tagg) {
    if(err) { return handleError(res, err); }
    if(!tagg) { return res.send(404); }
    return res.json(tagg);
  });
};

// Creates a new tagg in the DB.
exports.create = function(req, res) {
  Tagg.create(req.body, function(err, tagg) {
    if(err) { return handleError(res, err); }
    return res.json(201, tagg);
  });
};

// Updates an existing tagg in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tagg.findById(req.params.id, function (err, tagg) {
    if (err) { return handleError(res, err); }
    if(!tagg) { return res.send(404); }
    var updated = _.merge(tagg, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tagg);
    });
  });
};

// Deletes a tagg from the DB.
exports.destroy = function(req, res) {
  Tagg.findById(req.params.id, function (err, tagg) {
    if(err) { return handleError(res, err); }
    if(!tagg) { return res.send(404); }
    tagg.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}