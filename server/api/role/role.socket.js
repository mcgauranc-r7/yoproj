/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var role = require('./role.model');

exports.register = function(socket) {
  role.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  role.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
  role.schema.post('update', function (doc) {
    console.log("updating : sending event down to stream.");
    onUpdate(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('role:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('role:remove', doc);
}

function onUpdate(socket, doc, cb) {
  console.log("updating : sending event down to stream.");
  socket.emit('role:update', doc);
}
