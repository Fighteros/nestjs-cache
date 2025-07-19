
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';



export const winstonLoggerConfig = {
  // level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ alias: 'timestamp', format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }), // Capture stack trace
    format.json(), // Structured JSON for log aggregation tools
  ),

  transports: [
    new DailyRotateFile({
      filename: 'logs/app-%DATE%.error.log',
      format: format.combine(format.timestamp(), format.json()),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '30d',
      level: 'error',
    }),
    new DailyRotateFile({
      filename: 'logs/app-%DATE%.combined.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '30d',
    }),
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.timestamp({ alias: 'timestamp', format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize({ all: true }),
        format.prettyPrint({ colorize: true }),
        format.label({ label: 'nestjs-cache' }),
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
          return `${coloredTimestamp} ${coloredContext} ${level}: ${message}`;
        }),
      ),
    }),
  ],
};
