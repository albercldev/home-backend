import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../../user/domain/write-models/user.model';
import { JwtPayload } from '../../shared/types/JwtPayload';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user: User) {
    const payload: JwtPayload = {
      sub: user.uuid,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
