import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDeploymentCommand } from './create-deployment.command';
import DeploymentWriteRepository from '../adapters/deployment.write.repository';
import Deployment from '../../domain/write-models/deployment.model';

@CommandHandler(CreateDeploymentCommand)
export class CreateDeploymentHandler
  implements ICommandHandler<CreateDeploymentCommand>
{
  constructor(
    private readonly deploymentWriteRepository: DeploymentWriteRepository,
  ) {}

  async execute(command: CreateDeploymentCommand) {
    const deployment = Deployment.create(
      command.userUuid,
      command.name,
      command.repository,
      command.repositoryOwner,
      command.environment,
    );

    const id = await this.deploymentWriteRepository.create(deployment);
    deployment.commit();

    return id;
  }
}
