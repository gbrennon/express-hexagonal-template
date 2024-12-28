import { User } from '@src/domain/entities/User';
import { UuidNewUserFactory } from './UuidNewUserFactory';

describe('UuidNewUserFactory', () => {
  let factory: UuidNewUserFactory;

  beforeEach(() => {
    factory = new UuidNewUserFactory();
  });

  it('should create a new user with a UUID', async () => {
    const name = 'John Doe';
    const email = 'johndoe@gmail.com';
    const password = 'password';

    const user = await factory.create(
      'John Doe', 'johndoe@gmail.com', 'password'
    );

    const expectedUser = new User(
      user.id, name, email, password
    );
    expect(user).toEqual(expectedUser);
  });
});
