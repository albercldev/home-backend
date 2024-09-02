import { Module } from '@nestjs/common';
import { DockerController } from './adapters/rest/docker.controller';

@Module({
  controllers: [DockerController],
})
export class DockerModule {}
