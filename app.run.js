const {app} = require('./server');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({path: '.env.development'});
}

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});
}

const db = require('./app/models');
const MONGODB_URI = process.env.MONGODB_URI;

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
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
