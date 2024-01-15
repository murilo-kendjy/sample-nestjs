import { ApiProperty } from '@nestjs/swagger';
import { SelectUser } from 'src/drizzle/types.js';

export class UserEntity implements SelectUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
