const request = require('supertest');
const {app} = require('../server');

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});
}

let server;

beforeAll((done) => {
  server = app.listen(4000);
  done();
});

afterAll((done) => {
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
