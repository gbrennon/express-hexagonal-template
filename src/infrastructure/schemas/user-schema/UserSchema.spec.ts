import { User } from '@src/domain/entities/User';
import { UserSchema } from './UserSchema';

describe('UserSchema', () => {
  describe('constructor', () => {
    it('should create a new UserSchema', () => {
      const userSchema = new UserSchema();

      expect(userSchema).toBeInstanceOf(UserSchema);
    });
  });

  describe('toDomain', () => {
    it('should return a User entity', () => {
      const userSchema = new UserSchema();
      userSchema.id = '1';
      userSchema.name = 'John Doe';
      userSchema.email = 'johndoe@gmail.com';
      userSchema.password = '12345678';

      const user = userSchema.toDomain();

      const expectedUser = new User(
        '1',
        'John Doe',
        'johndoe@gmail.com',
        '12345678'
      );
      expect(user).toEqual(expectedUser);
    });
  });
});
