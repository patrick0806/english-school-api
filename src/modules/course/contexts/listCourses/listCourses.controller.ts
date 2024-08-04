import { Controller, Get, Query, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants/apiTags';
import { IRequest } from '@shared/interfaces/request.inter.face';

import { ListCoursesRequestDTO } from './dtos/request.dto';
import { ListCoursesResponseDTO } from './dtos/response.dto';
import { ListCoursesService } from './listCourses.service';

@ApiTags(API_TAGS.COURSE)
@Controller({ version: '1' })
export class ListCoursesController {
  constructor(private listCourseService: ListCoursesService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List courses' })
  @ApiOkResponse({
    description: 'Courses listed successfully',
    type: ListCoursesResponseDTO,
  })
  async handle(
    @Query() searchParams: ListCoursesRequestDTO,
    @Req() req: IRequest,
  ): Promise<ListCoursesResponseDTO> {
    return this.listCourseService.execute(searchParams, req.user);
  }
}
