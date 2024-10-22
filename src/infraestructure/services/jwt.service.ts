import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from 'src/application/interfaces/authRepository.interface';
import { IUserVerified } from 'src/common/interfaces/UserVerified.interface';
import { Tokens } from 'src/common/types/tokens.type';

@Injectable()
export class JwtAuthService implements AuthRepository {
  constructor(private jwtService: JwtService) {}

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 30, // 30 minutes
          secret: process.env.JWT_SECRET,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 60 * 24 * 7, // 7 days
          secret: process.env.JWT_SECRET_REFRESH,
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async verifyToken(token: string): Promise<IUserVerified> {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
