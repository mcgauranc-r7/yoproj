/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Role = require('./role.model');

// Get list of things
exports.index = function(req, res) {
  Role.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(things);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Role.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Role.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Role.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Role.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};
// Deletes a skill from a role.
exports.destroySkill = function(req, res) {
  var  skillsId= req.params.skills_id;
  var roleId= req.params.id
  Role.findOneAndUpdate(roleId, {$pull: {skills: {_id : skillsId}}}, function(err, data){
     if(err) {
      return res.status(500).json({'error' : 'error in deleting address'});
    }
    console.log("executed:")
    console.log("skillsId:" + skillsId)
    console.log("executed:"+ roleId)
    res.json(data);
  });
};
// add an achievment.
exports.addAchievment = function(req, res) {
  var  skillsId= req.params.skills_id;
  var roleId= req.params.id
  Role.findOneAndUpdate(roleId, {$push: {achievment: req.body}}, function(err, data){
    if(err) {
      return res.status(500).json({'error' : 'error in deleting address'});
    }
    res.json(data);
  });
};
function handleError(res, err) {
  return res.status(500).send(err);
}