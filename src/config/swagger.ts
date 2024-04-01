import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_BASE_PATH } from '@shared/constants/apiBasePath';

export class SwaggerConfig {
  static documentation = new DocumentBuilder()
    .setTitle('Wealth Wizard api')
    .setVersion('1.0')
    .addServer(API_BASE_PATH + '/v1')
    .setContact(
      'Patrick da Silva Nicezi',
      'https://github.com/patrick0806',
      'patrickk0806@gmail.com',
    )
    .addBearerAuth()
    .build();

  private createDocument(app: INestApplication<any>) {
    return SwaggerModule.createDocument(app, SwaggerConfig.documentation);
  }

  setupSwagger(path: string, app: INestApplication<any>) {
    SwaggerModule.setup(path, app, this.createDocument(app));
  }
}
