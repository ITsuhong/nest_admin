import { HttpStatus } from '@nestjs/common';

export class Result<T> {
  // 状态码
  code: number;

  // 请求结果信息
  message: string;

  // 数据
  data: T;

  ok(result?: { data?: any; message?: string; code?: number }) {
    const {
      data = null,
      message = 'success',
      code = HttpStatus.OK,
    } = result || {};
    this.code = code;
    this.message = message;
    return {
      ...this,
      data: data,
    };
  }

  error(data: { code?: number; message?: string }) {
    const { code = HttpStatus.INTERNAL_SERVER_ERROR, message = 'error' } = data;
    this.code = code;
    this.message = message;
    return this;
  }
}
