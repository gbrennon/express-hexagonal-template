import * as bcrypt from 'bcryptjs';
import { PasswordComparer } from '@domain/ports/PasswordComparer';

export class BCryptPasswordComparer implements PasswordComparer {
  public async compare(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  }
}
