'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({path: '.env.development'});
}

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});
}

const app = express();

var corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.json({message: 'Welcome to the team members application.'});
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/member.routes')(app);

module.exports = {app};
