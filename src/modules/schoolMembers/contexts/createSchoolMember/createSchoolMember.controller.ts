import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';

import { CreateSchoolMemberService } from './createSchoolMember.service';
import { CreateSchoolMemberRequestDTO } from './dtos/request.dto';
import { CreateSchoolMemberResponseDTO } from './dtos/response.dto';

@ApiTags(API_TAGS.SCHOOL_MEMBER)
@Controller({ version: '1' })
export class CreateSchoolMemberController {
  constructor(private createSchoolMemberService: CreateSchoolMemberService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new school member' })
  @ApiCreatedResponse({
    description: 'The school member has been successfully created',
    type: CreateSchoolMemberResponseDTO,
  })
  @Post()
  async handle(
    @Body() schoolMemberData: CreateSchoolMemberRequestDTO,
  ): Promise<CreateSchoolMemberResponseDTO> {
    return this.createSchoolMemberService.execute(schoolMemberData);
  }
}
