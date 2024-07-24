import { IncomingHttpHeaders } from 'node:http';

export function getHeader(headers: IncomingHttpHeaders, keyName: string) {
  if (!headers[keyName]) {
    return null;
  }

  return headers[keyName] as string;
}
