'use strict';

const {verifyToken} = require('../middleware');
const controller = require('../controllers/member.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/api/members', controller.getMembers);
  app.get('/api/users/:id/members', [verifyToken], controller.getMembersByUser);
  app.get('/api/members/:id', controller.getMember);
  app.put('/api/members/:id', [verifyToken], controller.updateMember);
  app.post('/api/members', [verifyToken], controller.addMember);
};
