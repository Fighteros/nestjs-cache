import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
    private logger: Logger = new Logger('NestApplication');

    use(request: Request, response: Response, next: NextFunction): void {
        const { method, query: queryParams, baseUrl: path } = request;

        // logging request
        setImmediate(async () => {
            const statusCode = response.statusCode;
            const requestLog = {
                method,
                path,
                queryParams,
                body: request.body,
            };
            statusCode === 200 ? this.logger.log(`Request: ${JSON.stringify(requestLog)}`, 'info') : this.logger.error(`Request: ${JSON.stringify(requestLog)}`, 'error');
        });


        // logging response
        // response.on('finish', async () => {
        //     const statusCode = response.statusCode;
        //     return setTimeout(() => {
        //         const responseLog = { method, path, statusCode: response.statusCode };
        //         statusCode === 200 ? this.logger.log(`Response: ${JSON.stringify(responseLog)}`, 'info') : this.logger.error(`Response: ${JSON.stringify(responseLog)}`, 'error');
        //     }, 0);
        // });

        next();
    }
}