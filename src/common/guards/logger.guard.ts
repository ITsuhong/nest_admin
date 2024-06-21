import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from '@/common/utils/log4js';

@Injectable()
export class LoggerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const code = res.statusCode;
    // console.log(request);
    const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${request.url}
    Method: ${request.method}

    Status code: ${100}
    Body: ${request.method === 'POST' ? JSON.stringify(request.body) : JSON.stringify(request.query)} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
    if (code >= 500) {
      Logger.error(logFormat);
    } else if (code >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }
    return true;
  }
}
