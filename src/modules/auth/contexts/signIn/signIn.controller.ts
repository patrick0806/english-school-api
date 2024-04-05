import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { API_TAGS } from '@shared/constants/apiTags';
import { Public } from '@shared/decorators/public.decorator';
import { IRequest } from '@shared/interfaces';

import { SignInRequestDTO } from './dto/request.dto';
import { SignInService } from './signIn.service';

@ApiTags(API_TAGS.AUTH)
@Controller({ path: 'sign-in', version: '1' })
export class SignInController {
  constructor(private signInService: SignInService) {}

  @Post()
  @Public()
  async handler(
    @Body() { firebaseToken }: SignInRequestDTO,
    @Req() req: IRequest,
    @Res() res: Response,
  ) {
    req.operation = 'signIn';
    const data = await this.signInService.execute(firebaseToken);
    res.setHeader('Authorization', `Bearer ${data}`);
    res.sendStatus(200);
  }
}
