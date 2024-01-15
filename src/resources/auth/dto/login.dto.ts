import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { MsgTranslate } from '../../../utils/translate.js';

const translate = new MsgTranslate<LoginDto>();

export class LoginDto {
  @IsNotEmpty({ message: translate.isNotEmpty('name') })
  @MaxLength(30, { message: translate.maxLength('name', 30) })
  @IsString({ message: translate.isString('name') })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: translate.isNotEmpty('password') })
  @IsString({ message: translate.isString('password') })
  @MaxLength(100, { message: translate.maxLength('password', 100) })
  @ApiProperty()
  password: string;
}
