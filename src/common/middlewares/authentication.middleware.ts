import { HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { RequestAuth } from '../types/request.type';
import { PrismaService } from 'src/infraestructure/prisma/prisma.service';
import { AuthRepository } from 'src/application/interfaces/authRepository.interface';
import { LoggerService } from 'src/infraestructure/services/logger.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private loggerService: LoggerService;

  constructor(
    @Inject('AuthRepository')
    private authRepository: AuthRepository,
    private prisma: PrismaService,
  ) {
    this.loggerService = LoggerService.getInstance();
  }

  async use(req: RequestAuth, res: Response, next: (error?: any) => void) {
    try {
      const { authorization } = req.headers;
      const accessToken = authorization?.split('Bearer ')[1];

      if (!accessToken) {
        return accessDenied(req.baseUrl, res);
      } else {
        const userVerified = await this.authRepository.verifyToken(accessToken);

        const user = await this.prisma.users.findUnique({
          where: {
            email: userVerified.email,
          },
        });

        if (!user || !user.hashRt) {
          return accessDenied(req.baseUrl, res);
        }

        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          token: accessToken,
          refreshToken: user.hashRt,
        };

        next();
      }
    } catch (error) {
      this.loggerService.error(
        `Access denied to ${req.baseUrl} with error: ${error.message || error}`,
      );
      accessDenied(req.baseUrl, res);
    }
  }
}

export function accessDenied(url: string, res: Response) {
  res.status(HttpStatus.UNAUTHORIZED).json({
    message: `Access denied to ${url}`,
    statusCode: HttpStatus.UNAUTHORIZED,
    timestamp: new Date().toISOString(),
    path: url,
  });
}
