import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { SelectUser } from '../../../drizzle/utils/users.drizzle.js';

export class UserEntity implements SelectUser {
  @ApiProperty()
  id: string;

  @Exclude()
  password: string;

  @ApiProperty()
  roleId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class UserNoPassEntity implements Omit<UserEntity, 'password'> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  roleId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
