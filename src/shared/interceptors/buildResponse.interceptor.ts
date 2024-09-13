import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { map, Observable } from 'rxjs';

import { HEADERS } from '@shared/constants';
import { IMetadaResponse } from '@shared/interfaces';
import { LogBuilderService } from '@shared/providers';
import { getHeader } from '@shared/utils';

@Injectable()
export class BuildResponseInterceptor implements NestInterceptor {
  private logger = LogBuilderService.getInstance();

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((params) => {
        const request = context.switchToHttp().getRequest<FastifyRequest>();
        const metadata: IMetadaResponse = {
          timestamp: new Date().toISOString(),
          transactionId: getHeader(request.headers, HEADERS.TRANSACTION_ID),
        };

        if (!request.url.includes('health')) {
          this.logger.build(
            { ...params, level: 'info' },
            {
              ...metadata,
              path: request.url,
              method: request.method,
              statusCode: 200,
            },
          );
        }

        return params;
      }),
    );
  }
}
