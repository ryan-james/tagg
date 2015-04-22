'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
  tag: {
  	type: String,
  	required: true,
  	trim: true
  }
});

module.exports = mongoose.model('Tag', TagSchema);