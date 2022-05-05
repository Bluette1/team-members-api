'use strict';

module.exports = {
  id: '1-drop-database',

  up: function (db) {
    return db.dropDatabase();
  },

  down: function (db) {},
};
