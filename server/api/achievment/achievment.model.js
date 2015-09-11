'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AchievmentSchema = new Schema({
  name: String,
  details: String
});

module.exports = mongoose.model('Achievment', AchievmentSchema);