import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Roles } from '@shared/decorators';
import { SchoolMemberRole } from '@shared/enums';

import { CreateContractService } from './createContract.service';
import { CreateContractRequestDTO } from './dtos/request.dto';

@Roles(SchoolMemberRole.ADMIN)
@ApiTags(API_TAGS.SCHOOL_MEMBER_CONTRACT)
@Controller({ version: '1' })
export class CreateContractController {
  constructor(private createContractService: CreateContractService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new contract' })
  @Post()
  async handle(@Body() contractData: CreateContractRequestDTO): Promise<void> {
    /* const pdf = await this.createContractService.execute(contractData);
    res.header('Content-disposition', 'attachment; filename=chart.pdf');
    res.header('Content-type', 'application/pdf');
    return res.send(pdf); */
    return this.createContractService.execute(contractData);
  }
}
