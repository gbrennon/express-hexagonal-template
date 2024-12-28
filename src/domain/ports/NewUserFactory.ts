import { User } from "@domain/entities/User";

export interface NewUserFactory {
  create(name: string, email: string, password: string): Promise<User>;
}
