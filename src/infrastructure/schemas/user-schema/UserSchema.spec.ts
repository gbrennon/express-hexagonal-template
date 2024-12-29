import { User } from '@domain/entities/User';
import { UserSchema } from './UserSchema';

describe('UserSchema', () => {
  describe('constructor', () => {
    it('should create a new UserSchema', () => {
      const userSchema = new UserSchema();

      expect(userSchema).toBeInstanceOf(UserSchema);
    });
  });

  describe('fromDomain', () => {
    it('should return a UserSchema', () => {
      const user = new User('1', 'John Doe', 'johndoe@gmail.com', '12345678');

      const userSchema = UserSchema.fromDomain(user);

      expect(userSchema.id).toBe(user.id);
      expect(userSchema.name).toBe(user.name);
      expect(userSchema.email).toBe(user.email);
      expect(userSchema.password).toBe(user.password);
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
