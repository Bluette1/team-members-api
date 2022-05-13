const findMembers = require('../../app/helpers/seed.helper');
const db = require('../../app/models');
const {connectDB, closeDB} = require('../../db.server');

const Member = db.member;

beforeAll((done) => {
  connectDB();
  done();
});

afterAll((done) => {
  closeDB();
  done();
});

describe('Seeder Helper Test', () => {
  beforeAll(() => {
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
    return Promise.all(
      members.map(async (member) => {
        await Member.create(member);
      }),
    );
  });

  afterAll((done) => {
    Member.deleteMany({}, async function (err) {
      if (err) console.log('Error on delete' + err);
      const existingMembers = await Member.find();
      expect(Array.isArray(existingMembers)).toBeTruthy();
      expect(existingMembers).toHaveLength(0);
      done();
    });
  });

  it('should test that the Seeder Helper async function `findMembers` is working correctly as expected', async () => {
    return findMembers([
      'Wayne Rooney',
      'Ryan Giggs',
      'Zlatan Ibrahimovich',
    ]).then((memberIds) => {
      expect(memberIds).toHaveLength(3);
      expect(Array.isArray(memberIds)).toBeTruthy();
    });
  });
});
