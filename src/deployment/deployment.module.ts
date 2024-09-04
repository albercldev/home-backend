import { Module } from '@nestjs/common';
import { DeploymentController } from './adapters/rest/deployment.controller';
import DeploymentAdapter from './application/adapters/deployment.adapter';
import DockerDeploymentAdapter from './adapters/docker/docker-deployment.adapter';
import { CreateDeploymentHandler } from './application/usecases/create-deployment.handler';
import DeploymentWriteRepository from './application/adapters/deployment.write.repository';
import TypeOrmDeploymentWriteRepository from './adapters/typeorm/type-orm-deployment.write.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import DeploymentEntity from './adapters/typeorm/entities/deployment.entity';
import DeploymentPermissionEntity from './adapters/typeorm/entities/deployment-permission.entity';
import { SetupDeploymentHandler } from './application/usecases/setup-deployment.handler';

@Module({
  controllers: [DeploymentController],
  imports: [
    TypeOrmModule.forFeature([DeploymentEntity, DeploymentPermissionEntity]),
    CqrsModule,
  ],
  providers: [
    {
      provide: DeploymentAdapter,
      useClass: DockerDeploymentAdapter,
    },
    {
      provide: DeploymentWriteRepository,
      useClass: TypeOrmDeploymentWriteRepository,
    },
    SetupDeploymentHandler,
    CreateDeploymentHandler,
  ],
})
export class DeploymentModule {}
