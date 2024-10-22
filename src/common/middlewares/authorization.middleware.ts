import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { RequestAuth } from '../types/request.type';
import { LoggerService } from 'src/infraestructure/services/logger.service';
import { Role } from '@prisma/client';
import { match } from 'path-to-regexp';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const pathsAllowedToUsers = [
  {
    method: Method.GET,
    baseUrl: '/services',
  },
  {
    method: Method.GET,
    baseUrl: '/users/me/services',
  },
  {
    method: Method.POST,
    baseUrl: '/users/me/services/:serviceId',
  },
  {
    method: Method.PUT,
    baseUrl: '/users/me/userServices/:userServiceId',
  },
  {
    method: Method.DELETE,
    baseUrl: '/users/me/userServices/:userServiceId',
  },
];

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  private loggerService: LoggerService;

  constructor() {
    this.loggerService = LoggerService.getInstance();
  }

  async use(req: RequestAuth, res: Response, next: (error?: any) => void) {
    try {
      const isAllowed = pathsAllowedToUsers.some((path) => {
        const isPathMatch = match(path.baseUrl, { decode: decodeURIComponent })(
          req.baseUrl,
        );
        return (
          path.method === req.method &&
          isPathMatch &&
          req.user.role === Role.USER
        );
      });

      if (isAllowed || req.user.role === Role.ADMIN) {
        return next();
      } else {
        this.loggerService.error(
          `Access denied to ${req.baseUrl} to the user: ${req.user.email}`,
        );
        accessDenied(req.baseUrl, res);
      }
    } catch (error) {
      this.loggerService.error(
        `Access denied to ${req.baseUrl} to the user: ${req.user.email} with error: ${error.message || error}`,
      );
      accessDenied(req.baseUrl, res);
    }
  }
}

export function accessDenied(url: string, res: Response) {
  res.status(HttpStatus.UNAUTHORIZED).json({
    message: `Access denied to ${url}`,
  });
}
