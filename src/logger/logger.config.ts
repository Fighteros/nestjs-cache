// src/logger/logger.config.ts
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, errors, json, printf } = format;

export const winstonLoggerConfig = {
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',

  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // Capture stack trace
    json(), // Structured JSON for log aggregation tools
  ),

  transports: [
    new transports.Console({
      format: combine(
        timestamp(),
        format.colorize({ all: true }),
        format.prettyPrint({ colorize: true }),
        nestWinstonModuleUtilities.format.nestLike('nestjs-cache', {
          colors: true,
          appName: true,
          processId: true,
          prettyPrint: true,
        }),
        format.printf(({ level, message, timestamp, context }) => {
          // 🔹 Use dim white/gray for timestamp for subtle appearance
          const coloredTimestamp = `\x1b[90m${timestamp}\x1b[0m`; // gray

          // 🔸 Use magenta or green for context to make it pop more
          const coloredContext = context
            ? `\x1b[35m[${context}]\x1b[0m` // bright magenta
            : `\x1b[32m[Application]\x1b[0m`; // green

          return `${coloredTimestamp} ${coloredContext}: ${message}`;
        }),
      ),
    }),

    new DailyRotateFile({
      dirname: 'logs/info',
      filename: 'app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
      level: 'info',
    }),

    new DailyRotateFile({
      dirname: 'logs/errors',
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '30d',
      level: 'error',
    }),
  ],
};
