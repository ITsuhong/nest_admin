import { Global, Module } from '@nestjs/common';
import { env } from './common/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/admin/user/user.module';

import { LoginModule } from './api/admin/login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from './api/admin/roles/roles.module';
import { RoutesModuleModule } from './api/admin/routes-module/routes-module.module';
import { AdministratorModule } from './api/admin/administrator/administrator.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(env.DATABASE_CONFIG),
    UserModule,
    LoginModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: 'suhong',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    RolesModule,
    RoutesModuleModule,
    AdministratorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
