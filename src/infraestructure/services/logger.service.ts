import { Injectable, Logger } from '@nestjs/common';

// This class uses the singleton pattern
@Injectable()
export class LoggerService {
  private static instance: LoggerService;
  private readonly logger = new Logger(LoggerService.name);

  private constructor() {}

  // Static method to get a single instance of the Logger
  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  log(message: string): void {
    this.logger.log(`[LOG]: ${message}`);
  }

  error(message: string): void {
    this.logger.error(`[ERROR]: ${message}`);
  }
}
