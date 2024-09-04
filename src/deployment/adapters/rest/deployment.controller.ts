import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import CreateDeploymentDto from './dto/create-deployment.dto';
import { CreateDeploymentCommand } from '../../application/usecases/create-deployment.command';
import { Request } from 'express';
import { JwtAuthGuard } from '../../../auth/jwt/jwt-auth.guard';
import { UserRoleGuard } from '../../../user/user-role.guard';
import { Roles } from '../../../user/user-role.decorator';
import { Role } from '../../../user/domain/enums/role.enum';
import { SetupDeploymentCommand } from '../../application/usecases/setup-deployment.command';
import DeploymentErrorFilter from './filters/deployment-error.filter';

@Controller('deployments')
@ApiTags('Deployments')
@UseGuards(JwtAuthGuard)
@UseFilters(DeploymentErrorFilter)
export class DeploymentController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @UseGuards(UserRoleGuard)
  @Roles([Role.ADMIN])
  @Post()
  async createDeployment(
    @Req() request: Request,
    @Body() createDeploymentDto: CreateDeploymentDto,
  ) {
    return this.commandBus.execute(
      new CreateDeploymentCommand(
        createDeploymentDto.name,
        createDeploymentDto.repository,
        createDeploymentDto.repositoryOwner,
        createDeploymentDto.environment,
        request.user.uuid,
      ),
    );
  }

  @ApiBearerAuth()
  @Roles([Role.ADMIN])
  @Post(':uuid/setup')
  async setupDeployment(@Req() request: Request, @Param('uuid') uuid: string) {
    return this.commandBus.execute(
      new SetupDeploymentCommand(request.user.uuid, uuid),
    );
  }
}
