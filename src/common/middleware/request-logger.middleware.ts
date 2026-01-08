import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { generateRandomId } from 'helpers/helper';
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = generateRandomId(32);
    res.setHeader('X-Request-Id', requestId);
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `[${requestId}] ${req.method} ${req.originalUrl} => ${res.statusCode} (${duration}ms)`,
      );
    });
    next();
  }
}
