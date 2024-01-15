import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DrizzleModule } from './drizzle/drizzle.module.js';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware.js';
import { AuthModule } from './resources/auth/auth.module.js';
import { UsersModule } from './resources/users/users.module.js';

@Module({
  imports: [UsersModule, DrizzleModule, ConfigModule.forRoot(), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
