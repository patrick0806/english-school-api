import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Roles } from '@shared/decorators';
import { SchoolMemberRole } from '@shared/enums';

import { CreateSchoolService } from './createSchool.service';
import { CreateSchoolRequestDTO } from './dtos/request.dto';
import { CreateSchoolResponseDTO } from './dtos/response.dto';

@Roles(SchoolMemberRole.ADMIN)
@ApiTags(API_TAGS.SCHOOL)
@Controller({ version: '1' })
export class CreateSchoolController {
  constructor(private createSchoolService: CreateSchoolService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new school' })
  @ApiCreatedResponse({
    description: 'The school has been successfully created',
    type: CreateSchoolResponseDTO,
  })
  @Post()
  async handle(
    @Body() schoolData: CreateSchoolRequestDTO,
  ): Promise<CreateSchoolResponseDTO> {
    return this.createSchoolService.execute(schoolData);
  }
}
