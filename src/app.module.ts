import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './config/typeorm.config.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { GithubOauthModule } from './auth/github/github-oauth.module';
import { JwtAuthModule } from './auth/jwt/jwt-auth.module';

@Module({
  imports: [
    JwtAuthModule,
    TypeOrmConfigModule,
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    GithubOauthModule,
  ],
})
export class AppModule {}
