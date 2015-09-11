'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RoleSchema = new Schema({
    id: Number
    , user_id: Number
    , title: String
    , description: String
    , skills:[{
        type: Schema.ObjectId,
        ref: 'Skill',
        required : false
    }]
    , achievments:[{
        type: Schema.ObjectId,
        ref: 'Achievment',
        required : false
    }]
    , body: String
    , from: Date
    , to: Date
    , company: String
    , location: String
    , coordinates: String
});
module.exports = mongoose.model('Role', RoleSchema);
