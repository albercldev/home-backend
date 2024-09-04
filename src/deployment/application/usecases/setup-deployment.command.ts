export class SetupDeploymentCommand {
  constructor(
    public readonly userUuid: string,
    public readonly deploymentUuid: string,
  ) {}
}
