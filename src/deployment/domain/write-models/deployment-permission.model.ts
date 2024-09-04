import { Permission } from '../enums/permission.enum';

export default class DeploymentPermission {
  constructor(
    public readonly userUuid: string,
    public readonly permissions: Permission[],
  ) {}
}
