import { ApiProperty } from '@nestjs/swagger';
import { InsertUser } from '../../../drizzle/types.js';

export class CreateUserDto implements InsertUser {
  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;
}
