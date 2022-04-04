'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./app/config/db.config');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
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

const db = require('./app/models');
const MONGODB_URI =
  `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/` + `${dbConfig.DB}`;
db.mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/member.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
