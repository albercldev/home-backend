import { Role } from '../enums/role.enum';

export default class UserReadModel {
  public constructor(
    readonly uuid: string,
    readonly username: string,
    readonly email: string,
    readonly roles: Role[],
  ) {}
}
