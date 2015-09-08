/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var thing = require('./skill.model');

exports.register = function(socket) {
  skill.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  skill.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('skill:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('skill:remove', doc);
}