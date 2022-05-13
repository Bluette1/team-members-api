const {app} = require('./server');
const {connectDB} = require('./db.server');
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({path: '.env.development'});
}
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});
}
if (!process.env.NODE_ENV) {
  require('dotenv').config();
}

connectDB();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
