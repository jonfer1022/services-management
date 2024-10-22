import { Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from 'src/infraestructure/services/logger.service';
import { RequestAuth } from '../types/request.type';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private loggerService: LoggerService;

  constructor() {
    this.loggerService = LoggerService.getInstance();
  }

  async use(req: RequestAuth, res: Response, next: (error?: any) => void) {
    const { method, baseUrl } = req;
    this.loggerService.log(
      `--> EXECUTING path: ${baseUrl} with method: ${method}, timestamp: ${Date.now().toString()}`,
    );
    next();
  }
}
