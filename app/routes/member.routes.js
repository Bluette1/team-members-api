'use strict';

const {verifyToken} = require('../middleware');
const controller = require('../controllers/member.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/api/members', controller.getMembers);
  app.get('/api/user/members', [verifyToken], controller.getAddedMembers);
  app.get('/api/member', controller.getMember);
  app.put('/api/member/:id', [verifyToken], controller.updateMember);
  app.post('/api/members', [verifyToken], controller.addMember);
};
