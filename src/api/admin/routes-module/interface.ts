import { RoutesModule } from './entities/routes-module.entity';

export interface IRoutesModule extends RoutesModule {
  children: RoutesModule[];
}
