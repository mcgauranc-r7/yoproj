/* global io */
'use strict';

angular.module('yoprojApp')
  .factory('socket', function(socketFactory) {

    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    return {
      socket: socket,

      /**
       * Register listeners to sync an array with updates on a model
       *
       * Takes the array we want to sync, the model name that socket updates are sent from,
       * and an optional callback function after new items are updated.
       *
       * @param {String} modelName
       * @param {Array} array
       * @param {Function} cb
       */
      syncUpdates: function (modelName, roles, cb) {
        cb = cb || angular.noop;
        /**
         * Syncs item creation/updates on 'model:save'
         */
        var syncUpdatesToUI = function(item,collection) {
          roles.every(function(role) {
            var array =role[collection];
            var oldItem = _.find(array, {_id: item._id});
            var index = array.indexOf(oldItem);
            var event = 'created';
            // replace oldItem if it exists
            // otherwise just add item to the collection
            if (oldItem) {
              array.splice(index, 1, item);
              event = 'updated';
            } else {
              array.push(item);
            }
            cb(event, item, array);
          });
        };
        socket.on('skills:save', function (item) {
          syncUpdatesToUI(item,"skills");
         });
        socket.on('achievments:save', function (item) {
          syncUpdatesToUI(item,"achievments");
        });


        /**
         * Syncs removed items on 'model:remove'
         */
        var syncDeletionsToUI = function(item,collection) {
          roles.every(function(role) {
            var array = role[collection];
            roles.every(function(role) {
              var event = 'deleted';
              _.remove(array, {_id: item._id});
              cb(event, item, array);
            });
          });
        }
        socket.on('skills:remove', function (item) {
          syncDeletionsToUI(item,"skills");
        });
        socket.on('achievments:remove', function (item) {
          syncDeletionsToUI(item,"achievments");
        });
      },

      /**
       * Removes listeners for a models updates on the socket
       *
       * @param modelName
       */
      unsyncUpdates: function (modelName) {
        socket.removeAllListeners(modelName + ':save');
        socket.removeAllListeners(modelName + ':remove');
      }
    };
  });
