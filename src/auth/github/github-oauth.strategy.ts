import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { AppConfig } from '../../config/app.config';
import { QueryBus } from '@nestjs/cqrs';
import FindUserByGithubIdQuery from '../../user/application/usecases/find-user-by-github-id.query';

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly configService: ConfigService<AppConfig>,
  ) {
    super({
      clientID: configService.get<string>('auth.github.clientId'),
      clientSecret: configService.get<string>('auth.github.clientSecret'),
      callbackURL: configService.get<string>('auth.github.callbackURL'),
      scope: ['public_profile'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const { id } = profile;
    const user = await this.queryBus.execute(new FindUserByGithubIdQuery(id));
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
