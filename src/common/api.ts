import { HttpException } from '@nestjs/common';

export function ApiError(code = '', message: any) {
  return new HttpException(
    {
      code,
      message,
    },
    400
  );
}

export function ApiOk(data: any) {
  return {
    data,
  };
}
