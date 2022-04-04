'use strict';

const mongoose = require('mongoose');

const Member = mongoose.model(
  'Member',
  new mongoose.Schema({
    name: String,
    company: String,
    status: String,
    notes: String,
  }),
);

module.exports = Member;
