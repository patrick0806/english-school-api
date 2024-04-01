import { Logger } from '@nestjs/common';

import { LOG_LEVEL_NAMES, LOG_LEVEL_VALUES } from '@shared/enums';
import { ILogParams, IRequest } from '@shared/interfaces';

export class LogBuilderService {
  private static instance: LogBuilderService;
  private readonly logger = new Logger();

  build(params: ILogParams, req: IRequest) {
    const log = {
      ...params,
      httpReqPath: req.originalUrl,
      httpReqMethod: req.method,
      timestamp: new Date().toUTCString(),
      app_name: 'english-school-api',
      level: params.level || LOG_LEVEL_VALUES.INFO,
      levelName: params.levelName || LOG_LEVEL_NAMES.INFO,
      message: params.message,
      operation: req.operation,
      duration: req.duration,
      durationUnit: req.durationUnit,
    };
    switch (log.level) {
      case LOG_LEVEL_VALUES.INFO:
        return this.logger.log(JSON.stringify(log, null, 2));
      case LOG_LEVEL_VALUES.DEBUG:
        return this.logger.debug(JSON.stringify(log, null, 2));
      default:
        return this.logger.error(JSON.stringify(log, null, 2));
    }
  }

  static getInstance() {
    if (!LogBuilderService.instance) {
      LogBuilderService.instance = new LogBuilderService();
    }
    return LogBuilderService.instance;
  }
}
