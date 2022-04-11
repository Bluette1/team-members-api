'use strict';

const db = require('../models');
const Member = db.member;
const findMembers = async (names) => {
  const members = [];
  await Promise.all(
    names.map(async (name) => {
      const member = await Member.findOne({name});
      if (member) {
        members.push(member.id);
      }
    }),
  );
  return members;
};
module.exports = findMembers;
