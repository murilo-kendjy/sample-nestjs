import { Module } from '@nestjs/common';
import { DrizzleModule } from '../../drizzle/drizzle.module.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DrizzleModule],
})
export class UsersModule {}
