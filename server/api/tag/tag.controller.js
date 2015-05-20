'use strict';

var _ = require('lodash');
var Tag = require('./tag.model');

// Get list of tags
exports.index = function(req, res) {
   var query = req.query.query;
   var r = new RegExp(query, 'gi');
   if(query){
     Tag.find({tag:r}).exec(function (err, tags) {
    //Tag.find({}, function (err, tags) {
      if(err) { return handleError(res, err); }
      return res.json(200, tags);
    });
   }
  else {
    //return res.json(200, tags);
    Tag.find({}, function (err, tags) {
      if(err) { return handleError(res, err); }
      return res.json(200, tags);
    });
  }
};

// Get a single tag
exports.show = function(req, res) {
  Tag.findById(req.params.id, function (err, tag) {
    if(err) { return handleError(res, err); }
    if(!tag) { return res.send(404); }
    return res.json(tag);
  });
};

// Creates a new tag in the DB.
exports.create = function(req, res) {

  console.log('tag req body: ');
  console.log(req.body);

  Tag.create(req.body, function(err, tag) {
    if(err) {  

      Tag.find({'tag': req.body.tag}, function (err, tag) {
        tag = tag[0];
        return res.json(200, tag);
      });

    }
    return res.json(201, tag);
  });
};

// Updates an existing tag in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tag.findById(req.params.id, function (err, tag) {
    if (err) { return handleError(res, err); }
    if(!tag) { return res.send(404); }
    var updated = _.merge(tag, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tag);
    });
  });
};

// Deletes a tag from the DB.
exports.destroy = function(req, res) {
  Tag.findById(req.params.id, function (err, tag) {
    if(err) { return handleError(res, err); }
    if(!tag) { return res.send(404); }
    tag.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log('there is a dupe');
  //console.log(res);
  return res.send(500, err);
}