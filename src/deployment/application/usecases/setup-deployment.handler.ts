import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import DeploymentWriteRepository from '../adapters/deployment.write.repository';
import { SetupDeploymentCommand } from './setup-deployment.command';
import DeploymentAdapter from '../adapters/deployment.adapter';

@CommandHandler(SetupDeploymentCommand)
export class SetupDeploymentHandler
  implements ICommandHandler<SetupDeploymentCommand>
{
  constructor(
    private readonly deploymentWriteRepository: DeploymentWriteRepository,
    private readonly deploymentAdapter: DeploymentAdapter,
  ) {}

  async execute(command: SetupDeploymentCommand) {
    const deployment = await this.deploymentWriteRepository.findById(
      command.deploymentUuid,
    );

    if (
      deployment.permissions.find(
        (permission) => permission.userUuid === command.userUuid,
      ) === undefined
    ) {
      throw new Error(
        'User does not have permission to deploy this deployment',
      );
    }

    await this.deploymentAdapter.deploy(deployment);
  }
}
