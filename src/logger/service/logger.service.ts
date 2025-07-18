// src/logger/logger.service.ts
import { Injectable, LoggerService, Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AppLogger implements LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  log(message: string, context?: string) {
    this.logger.log(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context);
  }

  debug?(message: string, context?: string) {
    if (this.logger.debug) {
      this.logger.debug(message, context);
    }
  }

  verbose?(message: string, context?: string) {
    if (this.logger.verbose) {
      this.logger.verbose(message, context);
    }
  }
}
