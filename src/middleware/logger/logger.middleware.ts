import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '@/common/utils/log4js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}

// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
  const code = res.status; // 响应状态码
  // console.log('11', res);
  next();
  // 组装日志信息
  const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.url}
    Method: ${req.method}

    Status code: ${code}
    Body: ${JSON.stringify(req.body)} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}
