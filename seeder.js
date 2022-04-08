'use strict';

const seeder = require('mongoose-seed');
const findMembers = require('./app/helpers/seed.helper');
const bcrypt = require('bcryptjs');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const MONGODB_URI = process.env.MONGODB_URI;
seeder.connect(MONGODB_URI, function () {
  // Load Mongoose models
  seeder.loadModels(['app/models/member.model.js', 'app/models/user.model.js']);

  // Clear specified collections
  seeder.clearModels(['Member', 'User'], function () {
    const members = [
      {
        name: 'Wayne Rooney',
        company: 'DC United',
        status: 'Active',
        notes: 'Man Utd Highest scorer',
      },
      {
        name: 'Ryan Giggs',
        company: 'Manchester United',
        status: 'Closed',
        notes: 'Most matches played',
      },
      {
        name: 'Zlatan Ibrahimovich',
        company: 'LA Galaxy',
        status: 'Active',
        notes: "I am 'ZLATAN'",
      },
    ];

    const membersData = [
      {
        model: 'Member',
        documents: members,
      },
    ];
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(membersData, function () {
      findMembers(['Wayne Rooney', 'Ryan Giggs', 'Zlatan Ibrahimovich']).then(
        (memberIds) => {
          const user = {
            username: 'Jose Mourinho',
            email: 'jose.mourinho@united.com',
            password: bcrypt.hashSync('password', 8),
            members: memberIds,
          };

          const userData = [{model: 'User', documents: [user]}];
          seeder.populateModels(userData, function () {
            seeder.disconnect();
          });
        },
      );
    });
  });
});
