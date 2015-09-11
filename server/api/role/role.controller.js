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
var Skill = require('../skill/skill.model');
var Achievment = require('../achievment/achievment.model');


// Get list of things
exports.index = function(req, res) {
  Role
      .find()
      .sort({from:-1})
      .populate('skills','name')
      .populate('achievments','details')
      .exec(function(err, docs) {
        if (err) {
          return handleError(res, err);
        }
        return res.status(200).json(docs);
      });
};

// Get a single thing
exports.show = function(req, res) {
  Role.findById(req.params.id, function(err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.status(404).send('Not Found');
    }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  console.log("Role.create")
  Role.create(req.body, function(err, thing) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Role.findById(req.params.id, function(err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(thing, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Role.findById(req.params.id, function(err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.status(404).send('Not Found');
    }
    thing.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};
// Deletes a skill from a role.
exports.destroyDetail = function(req, res) {
  var obj = {};
  obj[req.params.collection] = {
    _id: req.params.skills_id
  };
  if(req.params.collection === "skills") {
    Skill.findById(req.params.skills_id, function (err, thing) {
      if(err) { return handleError(res, err); }
      if(!thing) { return res.status(404).send('Not Found'); }
      thing.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    });
  } else {
    Achievment.findById(req.params.skills_id, function (err, thing) {
      if(err) { return handleError(res, err); }
      if(!thing) { return res.status(404).send('Not Found'); }
      thing.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    });
  }

};
// add a skill.
exports.addSkill = function(req, res) {
  var roleId = req.params.id;
  Skill.create(req.body, function(err, newSkill) {
    if (err) {
      return handleError(res, err);
    }
    Role.findOneAndUpdate(roleId, {
      $push: {"skills":newSkill.id}
    }, function(err, data) {
      if (err) {
        return res.status(500).json({
          'error': 'error in deleting address'
        });
      }
    });
    return res.status(201).json(newSkill);
  });

// Deletes a skill from a role.
  exports.destroySkill = function(req, res) {
    var obj = {};
    obj[req.params.collection] = {
      _id: req.params.skills_id
    };
    Role.findOneAndUpdate(req.params.id, {
      $pull: obj
    }, function(err, data) {
      if (err) {
        return res.status(500).json({
          'error': 'error in deleting address'
        });
      }
      res.json(data);
    });
  };
};


// add an achievment.
exports.addAchievment = function(req, res) {
  var roleId = req.params.id;
  Achievment.create(req.body, function(err, newAchievment) {
    if (err) {
      return handleError(res, err);
    }
    Role.findOneAndUpdate(roleId, {
      $push: {"achievments": newAchievment.id}
    }, function (err, data) {
      if (err) {
        return res.status(500).json({
          'error': 'error in deleting address'
        });
      }

    });
    return res.status(201).json(newAchievment);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}