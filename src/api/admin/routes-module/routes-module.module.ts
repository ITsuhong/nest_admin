import { Module } from '@nestjs/common';
import { RoutesModuleService } from './routes-module.service';
import { RoutesModuleController } from './routes-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesModule } from './entities/routes-module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoutesModule])],
  controllers: [RoutesModuleController],
  providers: [RoutesModuleService],
})
export class RoutesModuleModule {}
