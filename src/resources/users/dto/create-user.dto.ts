import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { InsertUser } from '../../../drizzle/utils/users.drizzle.js';
import { MsgTranslate } from '../../../utils/translate.js';

const translate = new MsgTranslate<CreateUserDto>();

export class CreateUserDto implements InsertUser {
  @IsNotEmpty({ message: translate.isNotEmpty('password') })
  @IsString({ message: translate.isString('password') })
  @MaxLength(100, { message: translate.maxLength('password', 100) })
  @Transform(({ value }) => bcrypt.hashSync(value, 12))
  @ApiProperty()
  password: string;

  @IsNotEmpty({ message: translate.isNotEmpty('name') })
  @IsString({ message: translate.isString('name') })
  @MaxLength(100, { message: translate.maxLength('name', 100) })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: translate.isNotEmpty('roleId') })
  @IsString({ message: translate.isString('roleId') })
  @MaxLength(100, { message: translate.maxLength('roleId', 100) })
  @ApiProperty()
  roleId: string;
}
