import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfig } from '../../config/app.config';
import { JwtPayload } from '../../shared/types/JwtPayload';
import { QueryBus } from '@nestjs/cqrs';
import FindUserQuery from '../../user/application/usecases/find-user.query';
import UserReadModel from '../../user/domain/read-models/user.read.model';

declare global {
  namespace Express {
    interface User extends UserReadModel {}
  }
}

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly queryBus: QueryBus,
  ) {
    super({
      // available options: https://github.com/mikenicholson/passport-jwt#configure-strategy
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Users can send us the JWT token either by a bearer token in an authorization header...
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // ... or in a cookie named "jwt"
        (request: Request) => request?.cookies?.jwt,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwt.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    return await this.queryBus.execute(new FindUserQuery(payload.sub));
  }
}
