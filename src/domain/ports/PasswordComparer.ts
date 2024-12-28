export interface PasswordComparer {
  compare(password: string, hash: string): Promise<boolean>;
}
