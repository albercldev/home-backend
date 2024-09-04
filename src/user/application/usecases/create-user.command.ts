import { Role } from '../../domain/enums/role.enum';

export class CreateUserCommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly roles: Role[],
  ) {}
}
