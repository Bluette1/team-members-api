'use strict';

const mongoose = require('mongoose');

const Member = mongoose.model(
  'Member',
  new mongoose.Schema({
    name: String,
    company: String,
    status: String,
    notes: String,
  }, {timestamps: true}),
);

module.exports = Member;
