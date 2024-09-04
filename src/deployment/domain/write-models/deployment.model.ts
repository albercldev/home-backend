import { AggregateRoot } from '@nestjs/cqrs';
import DeploymentPermission from './deployment-permission.model';
import { Permission } from '../enums/permission.enum';

export default class Deployment extends AggregateRoot {
  constructor(
    public uuid: string,
    public name: string,
    public repository: string,
    public repositoryOwner: string,
    public permissions: DeploymentPermission[],
    public environment: string,
  ) {
    super();
  }

  static create(
    userUuid: string,
    name: string,
    repository: string,
    repositoryOwner: string,
    environment: string,
  ) {
    return new Deployment(
      null,
      name,
      repository,
      repositoryOwner,
      [new DeploymentPermission(userUuid, [Permission.OWNER])],
      environment,
    );
  }

  setPermissions(userUuid: string, permissions: Permission[]) {
    const index = this.permissions.findIndex(
      (permission) => permission.userUuid === userUuid,
    );

    if (index !== -1) {
      this.permissions.splice(index, 1);
    }

    this.permissions.push(new DeploymentPermission(userUuid, permissions));
  }
}
