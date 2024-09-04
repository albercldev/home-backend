export class CreateDeploymentCommand {
  constructor(
    public readonly name: string,
    public readonly repository: string,
    public readonly repositoryOwner: string,
    public readonly environment: string,
    public readonly userUuid: string,
  ) {}
}
