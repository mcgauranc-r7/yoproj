/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var skill = require('./skill.model');

exports.register = function(socket) {

  skill.schema.post('save', function (doc) {
    console.log("skill create event");
    onSave(socket, doc);
  });
  skill.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });

}
function onSave(socket, doc, cb) {
  socket.emit('skills:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('skills:remove', doc);
}