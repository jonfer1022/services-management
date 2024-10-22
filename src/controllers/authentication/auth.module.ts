import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SessionService } from 'src/services/session.service';
import { JwtAuthService } from 'src/infraestructure/services/jwt.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    SessionService,
    JwtService,
    {
      provide: 'AuthRepository',
      useClass: JwtAuthService,
    },
  ],
})
export class AuthModule {}
