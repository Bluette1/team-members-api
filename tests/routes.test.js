const request = require('supertest');
const {app} = require('../server');
const db = require('../app/models');

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});
}

let server;

beforeAll((done) => {
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

  server = app.listen(4000);
  done();
});

afterAll((done) => {
  db.mongoose.disconnect();
  server.close();
  done();
});
describe('Auth Endpoints', () => {
  test('should create a new registration', async () => {
    const res = await request(server).post('/api/auth/signup').send({
      username: 'test',
      email: 'test@example.com',
      password: 'password',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username');
  });
});
