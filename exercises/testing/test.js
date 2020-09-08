const users = require('./users');
const { fixId } = require('./users');

// write some tests
describe('users', () => {
  test('findUser', async (done) => {
    expect(await user.findUser('1')).toBe(1);
    done();
  });
  test('fixId', () => {
    expect(fixId('100')).toBe(100);
  });
});
