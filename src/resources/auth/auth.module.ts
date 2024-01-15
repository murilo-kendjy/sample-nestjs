import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { DrizzleModule } from '../../drizzle/drizzle.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
config();

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    DrizzleModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '60min',
        algorithm: 'HS512',
        issuer: 'genus',
      },
    }),
  ],
})
export class AuthModule {}
