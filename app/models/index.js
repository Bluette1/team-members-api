'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model.js');
db.member = require('./member.model');

module.exports = db;
