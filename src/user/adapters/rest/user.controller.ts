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
import AuthenticatedRequest from '../../../shared/types/AuthenticatedRequest';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/jwt/jwt-auth.guard';
import { UserRoleGuard } from '../../user-role.guard';
import { Roles } from '../../user-role.decorator';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  async getUsers() {
    return this.queryBus.execute(new FindUsersQuery());
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  createUser(@Body() userDto: PostUserDto) {
    return this.commandBus.execute(
      new CreateUserCommand(
        userDto.username,
        userDto.password,
        userDto.roles as Role[],
      ),
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getMe(@Request() request: AuthenticatedRequest) {
    return this.queryBus.execute(new FindUserQuery(request.user.uuid));
  }

  @Get(':uuid')
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  async getUser(@Param('uuid') uuid: string) {
    return this.queryBus.execute(new FindUserQuery(uuid));
  }
}
