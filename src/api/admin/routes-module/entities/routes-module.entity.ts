import { Column, Entity, ManyToMany, Unique } from 'typeorm';
import { BaseEntity } from '../../../../common/entity/base.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity({
  comment: '路由模块',
  name: 'routes_module',
})
@Unique(['name'])
export class RoutesModule extends BaseEntity {
  @Column({
    comment: '父级模块',
  })
  pid: number;
  @Column({
    comment: '模块名称',
  })
  name: string;
  @Column({
    comment: '模块路径',
  })
  path: string;
  @Column({
    comment: '排序',
  })
  sort: number;
  @Column({
    comment: '描述',
  })
  description: string;
  @ManyToMany(() => Role, (role) => role.routes, { cascade: true })
  roles: Role[];
}
