'use strict';

const db = require('../models');
const Member = db.member;
const findMembers = async(names) => {
  const members = [];
  // const member = await Member.findOne({ name});
  // return member.id;

  await Promise.all(
    names.map(async(name) => {
      const member = await Member.findOne({name});
      // const id = reply.get('id');
      // let rep = reply;
      // rep = rep.toJSON();
      // set(rep, 'id', id);

      // rep.user = repUser.toJSON();
      // itmReplies.pushObject(rep);
      if (member) {
        members.push(member.id);
      }
    }),
  );
  return members;
};
module.exports = findMembers;
// export default findMembers;
