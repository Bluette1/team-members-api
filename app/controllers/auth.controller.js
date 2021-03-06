'use strict';

const db = require('../models');
const User = db.user;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const secret = process.env.SECRET_KEY;

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    var token = jwt.sign({id: user.id}, secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(201).send({
      id: user._id,
      username: user.username,
      email: user.email,
      members: user.members,
      accessToken: token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate('members')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({message: 'Internal server error', err});
        return;
      }

      if (!user) {
        return res.status(404).send({message: 'User Not found.'});
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      var token = jwt.sign({id: user.id}, secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        members: user.members,
        accessToken: token,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    });
};
