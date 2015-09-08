'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoleSchema = new Schema({
    id: Number
    , user_id: Number
    , title: String
    , description: String
    , skills:[{
        name: String,
        description: String
      }]
    , body: String
    , from: Date
    , to: Date
    , company: String
    , location: String
    , coordinates: String
});

module.exports = mongoose.model('Role', RoleSchema);
