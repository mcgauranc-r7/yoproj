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
}

function onSave(socket, doc, cb) {
  console.log(".......................")
  socket.emit('role:save', doc);
}

function onRemove(socket, doc, cb) {
  console.log(".......................")
  socket.emit('role:remove', doc);
}
