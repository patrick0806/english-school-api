import { LOG_LEVEL_NAMES, LOG_LEVEL_VALUES } from '@shared/enums';

export interface ILogParams {
  operation: string;
  message: string;
  level: LOG_LEVEL_VALUES;
  levelName: LOG_LEVEL_NAMES;
  httpReqURL?: string;
  error?: string;
  errorResposne?: string;
}
