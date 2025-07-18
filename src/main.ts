import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { winstonLoggerConfig } from './logger/logger.config';
import { AppLogger } from './logger/service/logger.service';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonLoggerConfig),
  });
  const logger = app.get(AppLogger);
  app.useLogger(logger);

  await app.listen(process.env.PORT ?? 9000);
  logger.log(`Application is running on port ${process.env.PORT}`, 'info');
}
bootstrap();
