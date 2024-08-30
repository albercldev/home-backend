import { AggregateRoot } from '@nestjs/cqrs';
import { Role } from '../enums/role.enum';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export default class User extends AggregateRoot {
  public constructor(
    readonly uuid: string,
    readonly username: string,
    readonly email: string,
    readonly passwordHash: string,
    readonly roles: Role[],
  ) {
    super();
  }

  static create(
    username: string,
    email: string,
    password: string,
    roles: Role[],
  ): User {
    if (!username) {
      throw new Error('Username is required');
    }

    if (!email) {
      throw new Error('Email is required');
    }

    if (!roles || roles.length === 0) {
      throw new Error('At least one role is required');
    }

    const user = new User(
      undefined,
      username,
      email,
      password && hashSync(password, genSaltSync()),
      roles,
    );
    user.apply({ type: 'UserCreated', payload: user });
    return user;
  }

  login(email: string, password: string) {
    return this.email === email && compareSync(password, this.passwordHash);
  }
}
