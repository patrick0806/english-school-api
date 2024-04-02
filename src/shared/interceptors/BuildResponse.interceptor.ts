import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { LogBuilderService } from '@shared/providers';

@Injectable()
export class BuildResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const logBuilder = LogBuilderService.getInstance();
    return next.handle().pipe(
      map((params) => {
        const request = context.switchToHttp().getRequest();
        try {
          logBuilder.build(params, request);
        } catch (error) {
          //do nothing on fail log
        }

        return params.data || params;
      }),
    );
  }
}
