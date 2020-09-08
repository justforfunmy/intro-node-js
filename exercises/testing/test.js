const users = require('./users');
const { fixId } = require('./users');

// write some tests
describe('users', () => {
  test('findUser', async (done) => {
    const user = await users.findUser(1);
    expect(user.id).toBe(1);
    done();
  });
  test('fixId', () => {
    expect(fixId('100')).toBe(100);
  });
});
