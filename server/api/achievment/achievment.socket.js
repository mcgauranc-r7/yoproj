/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var skill = require('./achievment.model');

exports.register = function(socket) {

  skill.schema.post('save', function (doc) {
    console.log("achievment create event");
    onSave(socket, doc);
  });
  skill.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });

}
function onSave(socket, doc, cb) {
  socket.emit('achievments:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('achievments:remove', doc);
}