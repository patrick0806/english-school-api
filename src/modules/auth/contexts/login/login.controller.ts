import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Public } from '@shared/decorators';

import { LoginRequestDTO } from './dtos/request.dto';
import { LoginResponseDTO } from './dtos/response.dto';
import { LoginService } from './login.service';

@Public()
@ApiTags(API_TAGS.AUTH)
@Controller({ version: '1', path: 'login' })
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ type: LoginResponseDTO, description: 'Login successfully' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() loginData: LoginRequestDTO): Promise<LoginResponseDTO> {
    return await this.loginService.execute(loginData);
  }
}
