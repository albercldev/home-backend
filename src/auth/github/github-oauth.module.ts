import { Module } from '@nestjs/common';
import { UserModule } from '../../user/user.module';
import { GithubOauthController } from './github-oauth.controller';
import { GithubOauthStrategy } from './github-oauth.strategy';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [JwtAuthModule, UserModule, CqrsModule],
  controllers: [GithubOauthController],
  providers: [GithubOauthStrategy],
})
export class GithubOauthModule {}
