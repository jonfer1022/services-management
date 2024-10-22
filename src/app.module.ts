import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationMiddleware } from './common/middlewares/authentication.middleware';
import { AuthModule } from './controllers/authentication/auth.module';
import { PrismaModule } from './infraestructure/prisma/prisma.module';
import { JwtAuthService } from './infraestructure/services/jwt.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthorizationMiddleware } from './common/middlewares/authorization.middleware';
import { ServicesModule } from './controllers/services/services.module';
import { UserServicesModule } from './controllers/userServices/userServices.module';

const api = '';
export const pathsExcluded = [
  `${api}/auth/signin`,
  `${api}/auth/signup`,
  `${api}/auth/refresh`,
];

@Module({
  imports: [AuthModule, PrismaModule, ServicesModule, UserServicesModule],
  providers: [
    JwtService,
    {
      provide: 'AuthRepository',
      useClass: JwtAuthService,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(...pathsExcluded)
      .forRoutes('*');
    consumer
      .apply(AuthorizationMiddleware)
      .exclude(...pathsExcluded)
      .forRoutes('*');
  }
}
