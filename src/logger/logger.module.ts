import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from './logger.config';
import { AppLogger } from './service/logger.service';
import { HttpLoggerMiddleware } from './http-logger.middleware';

@Module({
  imports: [WinstonModule.forRoot(winstonLoggerConfig)],
  providers: [AppLogger, HttpLoggerMiddleware],
  exports: [AppLogger, HttpLoggerMiddleware],
})
export class LoggerModule {}
