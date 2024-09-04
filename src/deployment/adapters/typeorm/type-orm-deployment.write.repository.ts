import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import DeploymentWriteRepository from '../../application/adapters/deployment.write.repository';
import DeploymentEntity from './entities/deployment.entity';
import Deployment from 'src/deployment/domain/write-models/deployment.model';
import DeploymentPermissionEntity from './entities/deployment-permission.entity';

@Injectable()
export default class TypeOrmDeploymentWriteRepository
  implements DeploymentWriteRepository
{
  constructor(
    @InjectRepository(DeploymentEntity)
    private readonly deploymentRepository: Repository<DeploymentEntity>,
    @InjectRepository(DeploymentPermissionEntity)
    private readonly deploymentPermissionRepository: Repository<DeploymentPermissionEntity>,
  ) {}

  async create(deployment: Deployment): Promise<string> {
    const createdEntity = this.deploymentRepository.create({
      name: deployment.name,
      repository: deployment.repository,
      repositoryOwner: deployment.repositoryOwner,
      environment: deployment.environment,
    });

    createdEntity.permissions = deployment.permissions.map((permission) => {
      return this.deploymentPermissionRepository.create({
        user: permission.userUuid,
        permissions: permission.permissions,
        deploymentUuid: createdEntity.uuid,
      });
    });

    const savedEntity = await this.deploymentRepository.save(createdEntity, {});

    return savedEntity.uuid;
  }

  update(deployment: Deployment): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(uuid: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(uuid: string): Promise<Deployment> {
    const entity = await this.deploymentRepository.findOneOrFail({
      where: { uuid },
    });

    return entity.toModel();
  }

  findByRepository(
    repository: string,
    repositoryOwner: string,
  ): Promise<Deployment> {
    throw new Error('Method not implemented.');
  }
}
