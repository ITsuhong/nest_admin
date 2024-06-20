import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesModule } from '../routes-module/entities/routes-module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoutesModule])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
