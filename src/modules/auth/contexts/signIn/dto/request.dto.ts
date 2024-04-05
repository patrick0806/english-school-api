import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInRequestDTO {
  @IsString()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhdHJpY2trMDgwNkBnbWFpbC5jb20iLCJuYW1lIjoiUGF0cmljayBOaWNlemkiLCJzdWIiOiIxOHE5RXBUVVZ3ZHpFRjZVWm9tNkhhRUtQQ2kxIiwiaWF0IjoxNzEyMzM5ODg3LCJleHAiOjE3MTI0MjYyODd9.f3V5yg93vNABsqpB8-Wh5EMhuH_z75t8JNwZqW_h1go',
  })
  firebaseToken: string;
}
