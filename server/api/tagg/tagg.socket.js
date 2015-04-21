/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Tagg = require('./tagg.model');

exports.register = function(socket) {
  Tagg.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Tagg.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tagg:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tagg:remove', doc);
}