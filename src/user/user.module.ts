import { Module } from '@nestjs/common';
import { UserController } from './adapters/rest/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './adapters/typeorm/entities/user.entity';
import UserReadRepository from './application/adapters/user.read.repository';
import TypeOrmUserReadRepository from './adapters/typeorm/type-orm-user.read.repository';
import UserWriteRepository from './application/adapters/user.write.repository';
import TypeOrmUserWriteRepository from './adapters/typeorm/type-orm-user.write.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/usecases/create-user.handler';
import FindUsersHandler from './application/usecases/find-users.handler';
import FindUserHandler from './application/usecases/find-user.handler';
import FindUserByGithubIdHandler from './application/usecases/find-user-by-github-id.handler';
import LoginHandler from './application/usecases/login.handler';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  providers: [
    {
      provide: UserWriteRepository,
      useClass: TypeOrmUserWriteRepository,
    },
    {
      provide: UserReadRepository,
      useClass: TypeOrmUserReadRepository,
    },
    CreateUserHandler,
    FindUsersHandler,
    FindUserHandler,
    FindUserByGithubIdHandler,
    LoginHandler,
  ],
  controllers: [UserController],
})
export class UserModule {}
