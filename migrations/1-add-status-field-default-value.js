'use strict';

module.exports = {
  id: '1-add-status-field-default-value',

  up: function (db) {
    return db
      .collection('members')
      .updateMany({status: null}, {$set: {status: 'Active'}}, false, true);
  },

  down: function (db) {
    return db
      .collection('members')
      .updateMany({}, {$unset: {status: ''}}, false, true);
  },
};
