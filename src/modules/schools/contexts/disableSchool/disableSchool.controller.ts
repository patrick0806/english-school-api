import { Controller, Param, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Roles } from '@shared/decorators';
import { SchoolMemberRole } from '@shared/enums';

import { DisableSchoolService } from './disableSchool.service';
import { DisableSchoolResponseDTO } from './dtos/response.dto';

@Roles(SchoolMemberRole.ADMIN)
@ApiTags(API_TAGS.SCHOOL)
@Controller({ version: '1' })
export class DisableSchoolController {
  constructor(private disableSchoolService: DisableSchoolService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Disable a school' })
  @ApiOkResponse({
    description: 'The school has been successfully created',
    type: DisableSchoolResponseDTO,
  })
  @Patch('/:schoolId/disable')
  async handle(
    @Param('schoolId') schoolId: number,
  ): Promise<DisableSchoolResponseDTO> {
    return this.disableSchoolService.execute(schoolId);
  }
}
