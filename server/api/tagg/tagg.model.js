'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaggSchema = new Schema({
  title: {
  	type: String,
    required: true,
    trim: true
  },
  url: {
  	type: String,
    required: true,
    trim: true
  },
  tag: {
  	type: String,
    required: true,
    trim: true
  },
  date: {
  	type: Date,
  	default: Date.now
  }
});

module.exports = mongoose.model('Tagg', TaggSchema);