import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { ValidationPipe } from './common/validation/validation.pipe';
import { logger } from '@/middleware/logger/logger.middleware';
import { LoggerGuard } from '@/common/guards/logger.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new LoggerGuard());
  // app.use(logger);
  await app.listen(3000);
}

bootstrap();
