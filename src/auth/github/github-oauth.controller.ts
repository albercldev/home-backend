import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { GithubOauthGuard } from './github-oauth.guard';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import User from '../../user/domain/write-models/user.model';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth/github')
@ApiTags('Github Auth')
export class GithubOauthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async githubAuth() {}

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  async githubAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user as User;

    const { accessToken } = this.jwtAuthService.login(user);
    res.cookie('jwt', accessToken);
    return { access_token: accessToken };
  }
}
