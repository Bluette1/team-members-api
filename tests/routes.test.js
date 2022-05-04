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

describe('GET /api/members', () => {
  test('should retrieve a list of members', async () => {
    const res = await request(server).get('/api/members').send();
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

describe('POST /api/members', (done) => {
  let accessToken;
  beforeEach(async () => {
    await request(server)
      .post('/api/auth/signup')
      .send({
        username: 'test',
        email: 'test@example.com',
        password: 'password',
      })
      .then(async (res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('username');
        await request(server)
          .post('/api/auth/signin')
          .send({
            username: 'test',
            password: 'password',
          })
          .then((resp) => {
            expect(resp.statusCode).toEqual(200);
            expect(resp.body).toHaveProperty('username');
            expect(resp.body).toHaveProperty('accessToken');
            accessToken = resp.body.accessToken;
          });
      });
  });

  test('create a member successfully', () => {
    expect(accessToken).toBeTruthy();
    return request(server)
      .post('/api/members')
      .set('x-access-token', accessToken)
      .send({
        name: 'test',
        company: 'company',
        status: 'status',
        notes: 'notes',
      })
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('name');
      })
      .catch((err) => done(err));
  });
});
