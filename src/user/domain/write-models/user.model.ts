import { AggregateRoot } from '@nestjs/cqrs';
import { Role } from '../enums/role.enum';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export default class User extends AggregateRoot {
  public constructor(
    readonly uuid: string,
    readonly username: string,
    readonly passwordHash: string,
    readonly roles: Role[],
  ) {
    super();
  }

  static create(username: string, password: string, roles: Role[]): User {
    if (!username) {
      throw new Error('Username is required');
    }

    if (!roles || roles.length === 0) {
      throw new Error('At least one role is required');
    }

    if (password && password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const user = new User(
      undefined,
      username,
      password && hashSync(password, genSaltSync()),
      roles,
    );
    user.apply({ type: 'UserCreated', payload: user });
    return user;
  }

  login(username: string, password: string) {
    if (!this.passwordHash) return false;

    return (
      this.username === username && compareSync(password, this.passwordHash)
    );
  }
}
