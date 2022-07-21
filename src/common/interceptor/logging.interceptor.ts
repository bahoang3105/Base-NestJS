import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
const querystring = require('querystring');
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HttpLog');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    this.logger.debug(
      `${req.user ? `[${req.user['address']}]` : ''}[${req.ip}] ${req.method} ${
        req.originalUrl
      }`
    );
    if (req.query && Object.keys(req.query).length > 0) {
      this.logger.debug('query', req.query);
    }
    // if (req.body && Object.keys(req.body).length > 0) {
    //   this.logger.debug('req.body', req.body);
    // }

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.debug(
          `${req.user ? `[${req.user['address']}]` : ''}[${req.ip}] ${
            req.method
          } ${req.originalUrl} ${Date.now() - now}ms`
        );
      })
    );
  }
}
