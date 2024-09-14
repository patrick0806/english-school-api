import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Roles } from '@shared/decorators';
import { UserRole } from '@shared/enums/user';

import { FindByZipCodeResponseDTO } from './dtos/response.dto';
import { FindByZipCodeService } from './findByZipCode.service';

@Roles(UserRole.ADMIN)
@ApiTags(API_TAGS.LOCALITY)
@Controller({ version: '1' })
export class FindByZipCodeController {
  constructor(private findByZipCodeService: FindByZipCodeService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find locality by zip code' })
  @ApiOkResponse({ type: FindByZipCodeResponseDTO })
  @Get(':zipCode')
  async handler(
    @Param('zipCode') zipCode: string,
  ): Promise<FindByZipCodeResponseDTO> {
    return this.findByZipCodeService.execute(zipCode);
  }
}
