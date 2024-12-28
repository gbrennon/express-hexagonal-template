import * as bcrypt from 'bcryptjs';

import { BCryptPasswordComparer } from "./BCryptPasswordComparer";

describe("BCryptPasswordComparer", () => {
  let passwordComparer: BCryptPasswordComparer;

  beforeAll(() => {
    passwordComparer = new BCryptPasswordComparer();
  });

  describe("compare", () => {
    it("should return true when the password matches the hash", async () => {
      const password = "password";
      const hash = await bcrypt.hash(password, 10);

      const result = await passwordComparer.compare(password, hash);

      expect(result).toBe(true);
    });

    it("should return false when the password does not match the hash", async () => {
      const password = "password";
      const wrongPassword = "wrongPassword";
      const hash = await bcrypt.hash(password, 10);

      const result = await passwordComparer.compare(wrongPassword, hash);

      expect(result).toBe(false);
    });
  });
});
