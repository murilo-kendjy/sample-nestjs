import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DrizzleModule } from './drizzle/drizzle.module.js';
import { AuthGuard } from './guards/auth/auth.guard.js';
import { RolesGuard } from './guards/roles/roles.guard.js';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware.js';
import { AuthModule } from './resources/auth/auth.module.js';
import { UsersModule } from './resources/users/users.module.js';

@Module({
  imports: [UsersModule, DrizzleModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
