import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants/apiTags';
import { ExceptionDTO } from '@shared/filters/exception.dto';
import { ILogParams, IRequest } from '@shared/interfaces';

import { CreateUserService } from './createUser.service';
import { CreateUserRequestDTO } from './dtos/request.dto';

@ApiTags(API_TAGS.USERS)
@Controller()
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreateUserRequestDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ExceptionDTO })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: ExceptionDTO })
  @ApiResponse({ status: 409, description: 'Conflict', type: ExceptionDTO })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ExceptionDTO,
  })
  async handle(
    @Body() user: CreateUserRequestDTO,
    @Req() req: IRequest,
  ): Promise<ILogParams> {
    req.operation = 'createUser';
    const data = await this.createUserService.execute(user);
    return {
      data,
      message: 'User created successfully',
    };
  }
}
