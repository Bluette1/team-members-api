'use strict';

const db = require('../models');
const Member = db.member;
const User = db.user;

exports.addMember = async (req, res) => {
  const {name, company, status, notes} = req.body;
  const member = new Member({
    name,
    company,
    status,
    notes,
  });

  member.save((err, member) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    const userId = req.userId;
    User.findById(userId).exec((err, user) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }
      user.members.push(member.id);
      user.save((err, user) => {
        if (err) {
          res.status(500).send({message: err});
          return;
        }
        res.status(201).send(member);
      });
    });
  });
};

exports.updateMember = async (req, res) => {
  const {id} = req.params;
  const {name, company, status, notes} = req.body;
  const member = {
    name,
    company,
    status,
    notes,
  };

  Member.findByIdAndUpdate(id, member, {
    new: true,
    useFindAndModify: false,
  }).exec((err, updatedMember) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    res.status(200).send(updatedMember);
  });
};

exports.deleteMember = async (req, res) => {
  const {id} = req.params;
  const userId = req.userId;
  User.findById(userId).exec((err, user) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    const membersUpdated = user.members.filter((memberId) => memberId !== id);
    user.members = membersUpdated;
    user.save((err, user) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }
      Member.findOneAndDelete({_id: id}).exec((err) => {
        if (err) {
          res.status(500).send({message: err});
          return;
        }
        res.status(204).send();
      });
    });
  });
};

exports.getMembersByUser = (req, res) => {
  const {id} = req.params;
  User.findById(id)
    .populate('members')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }
      let members = [...user.members];
      members = members.map((member) => ({
        id: member.id,
        name: member.name,
        company: member.company,
        notes: member.notes,
        status: member.status,
        createdAt: member.createdAt,
        updatedAt: member.updatedAt,
      }));
      res.status(200).send(members);
    });
};

exports.getMembers = (req, res) => {
  Member.find({}).exec((err, members) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    res.send(members);
  });
};

exports.getMember = (req, res) => {
  const {id} = req.params;
  Member.findById(id).exec((err, member) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    if (!member) {
      res.status(404).send({message: 'Not Found'});
    }
    res.send(member);
  });
};
