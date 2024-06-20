import { BaseEntity } from '../../../../common/entity/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { RoutesModule } from '../../routes-module/entities/routes-module.entity';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @Column({
    comment: '角色名称',
  })
  name: string;

  @Column({
    comment: '角色描述',
  })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => RoutesModule, (routesModule) => routesModule.roles)
  @JoinTable({
    name: 'role_routes',
  })
  routes: RoutesModule[];
}
