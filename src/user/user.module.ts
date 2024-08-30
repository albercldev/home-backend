import { Module } from '@nestjs/common';
import { UserController } from './adapters/rest/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './adapters/typeorm/entities/user.entity';
import UserReadRepository from './application/adapters/user.read.repository';
import UserReadRepositoryTypeORM from './adapters/typeorm/user.read.repository.typeorm';
import UserWriteRepository from './application/adapters/user.write.repository';
import UserWriteRepositoryTypeORM from './adapters/typeorm/user.write.repository.typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/usecases/create-user.handler';
import FindUsersHandler from './application/usecases/find-users.handler';
import FindUserHandler from './application/usecases/find-user.handler';
import FindUserByGithubIdHandler from './application/usecases/find-user-by-github-id.handler';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  providers: [
    {
      provide: UserWriteRepository,
      useClass: UserWriteRepositoryTypeORM,
    },
    {
      provide: UserReadRepository,
      useClass: UserReadRepositoryTypeORM,
    },
    CreateUserHandler,
    FindUsersHandler,
    FindUserHandler,
    FindUserByGithubIdHandler,
  ],
  controllers: [UserController],
})
export class UserModule {}
