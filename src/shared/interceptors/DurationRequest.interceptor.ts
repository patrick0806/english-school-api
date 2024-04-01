import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';

import { IRequest } from '@shared/interfaces';

@Injectable()
export class DurationRequestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<IRequest>();
    request.duration = Date.now();
    request.durationUnit = 'ms';

    return next.handle();
  }
}
