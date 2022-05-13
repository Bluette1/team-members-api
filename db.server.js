if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});
}
const db = require('./app/models');

const MONGODB_URI = process.env.MONGODB_URI;
const connectDB = () => {
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
};

const closeDB = () => {
  db.mongoose.disconnect();
};

module.exports = {connectDB, closeDB};
