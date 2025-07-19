import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { winstonLoggerConfig } from './logger/logger.config';


dotenv.config({ path: '.env.dev' });

async function bootstrap() {
  const logger = new Logger('Bootstrap', {
    timestamp: true,
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonLoggerConfig),
  });

  await app.listen(process.env.PORT ?? 9000);
  logger.log(`Application is running on port ${process.env.PORT}`, 'info');
  logger.log(
    `Application is running on DB ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`,
    'info',
  );
  logger.log(
    `Application is running on DB NAME ${process.env.DATABASE_NAME}`,
    'info',
  );
}
bootstrap();
