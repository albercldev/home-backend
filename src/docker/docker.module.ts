import { Module } from '@nestjs/common';
import { DockerController } from './docker.controller';

@Module({
  controllers: [DockerController]
})
export class DockerModule {}
