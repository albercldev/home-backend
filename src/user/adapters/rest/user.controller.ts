import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import PostUserDto from './dto/post-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/usecases/create-user.command';
import FindUsersQuery from '../../application/usecases/find-users.query';
import { Role } from '../../domain/enums/role.enum';
import FindUserQuery from '../../application/usecases/find-user.query';
import { JwtAuthGuard } from '../../../auth/jwt/jwt-auth.guard';
import AuthenticatedRequest from '../../../shared/types/AuthenticatedRequest';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserRoleGuard } from '../../user-role.guard';
import { Roles } from '../../user-role.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, UserRoleGuard)
@Roles([Role.ADMIN])
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiBearerAuth()
  async getUsers() {
    return this.queryBus.execute(new FindUsersQuery());
  }

  @Post()
  @ApiBearerAuth()
  async createUser(@Body() userDto: PostUserDto) {
    return await this.commandBus.execute(
      new CreateUserCommand(
        userDto.email,
        userDto.username,
        userDto.password,
        userDto.roles as Role[],
      ),
    );
  }

  @Get(':uuid')
  @ApiBearerAuth()
  async getUser(
    @Request() request: AuthenticatedRequest,
    @Param('uuid') uuid: string,
  ) {
    return this.queryBus.execute(new FindUserQuery(uuid));
  }
}
