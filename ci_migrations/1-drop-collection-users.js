'use strict';

module.exports = {
  id: '1-drop-collection-users',

  up: function (db) {
    return db.collection('users').remove();
  },

  down: function (db) {},
};
