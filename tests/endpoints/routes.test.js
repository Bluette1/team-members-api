const request = require('supertest');
const {app} = require('../../server');
const {connectDB, closeDB} = require('../../db.server');
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});
}

let server;

beforeAll((done) => {
  connectDB();
  server = app.listen(4000);
  done();
});

afterAll((done) => {
  closeDB();
  server.close();
  done();
});

let accessToken;
let userId;
let id;
describe('Should retrieve a list of members', () => {
  test('GET /api/members', async () => {
    expect(true).toBe(true);
    await request(server)
      .get('/api/members')
      .send()
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });
});
beforeAll(async () => {
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
      userId = res.body.id;
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

describe('Create a member successfully ', () => {
  test('POST /api/members', async () => {
    expect(accessToken).toBeTruthy();
    await request(server)
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
        id = res.body._id;
      });
  });
});

test('GET /api/users/:id/members', async () => {
  expect(accessToken).toBeTruthy();
  expect(userId).toBeTruthy();
  await request(server)
    .get(`/api/users/${userId}/members`)
    .set('x-access-token', accessToken)
    .expect(200)
    .then((res) => {
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body).toHaveLength(1);
      expect(res.body[0].id).toBe(id);
    });
});

describe('Remaining tests for member endpoints', () => {
  afterAll(async () => {
    expect(accessToken).toBeTruthy();
    expect(userId).toBeTruthy();
    await request(server)
      .get(`/api/users/${userId}/members`)
      .set('x-access-token', accessToken)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body).toHaveLength(0);
      });
  });

  test('GET /api/members/:id', async () => {
    expect(accessToken).toBeTruthy();
    expect(id).toBeTruthy();
    await request(server)
      .get(`/api/members/${id}`)
      .set('x-access-token', accessToken)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toBe('test');
        expect(res.body._id).toEqual(id);
      });
  });

  test('PUT /api/members/:id', async () => {
    expect(accessToken).toBeTruthy();
    expect(id).toBeTruthy();
    await request(server)
      .put(`/api/members/${id}`)
      .set('x-access-token', accessToken)
      .send({
        name: 'test1',
        company: 'company1',
        status: 'status1',
        notes: 'notes',
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('name');
        expect(res.body._id).toEqual(id);

        expect(res.body.name).toBe('test1');
      });
  });

  test('DELETE /api/members/:id', async () => {
    expect(accessToken).toBeTruthy();
    expect(id).toBeTruthy();
    await request(server)
      .delete(`/api/members/${id}`)
      .set('x-access-token', accessToken)
      .send()
      .expect(204)
      .then((res) => {
        expect(res.body).toStrictEqual({});
      });
  });
});
