'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaggSchema = new Schema({
  title: String,
  url: String,
  tag: String
});

module.exports = mongoose.model('Tagg', TaggSchema);