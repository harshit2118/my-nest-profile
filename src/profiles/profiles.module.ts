import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { RequestLoggerMiddleware } from 'src/common/middleware/request-logger.middleware';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('profiles');
  }
}
