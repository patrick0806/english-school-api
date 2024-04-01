import { HttpException } from '@nestjs/common';

export class HttpConnectorException extends HttpException {
  constructor(error) {
    if (!error.response || !error.response.status) {
      throw new Error(error);
    }

    super(error.response, error.response.status || 500);
    const { baseURL, url, method } = error.response.config;
    const urlPath = url?.split('?')[0] || '';
    const fullURL = baseURL?.substring(0, baseURL?.length - 1) + urlPath;
    this.message = `Connector Error: [${method}] ${fullURL}`;
  }
}
