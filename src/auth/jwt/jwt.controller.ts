import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import { CommandBus } from '@nestjs/cqrs';
import LoginCommand from '../../user/application/usecases/login.command';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthService } from './jwt-auth.service';

@Controller('auth')
@ApiTags('Auth')
export class JwtController {
  constructor(
    readonly commandBus: CommandBus,
    readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.commandBus.execute(
      new LoginCommand(loginDto.username, loginDto.password),
    );

    if (!user) {
      return {
        message: 'Invalid credentials',
      };
    }

    return this.jwtAuthService.login(user);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Request) {
    return req.user;
  }
}
