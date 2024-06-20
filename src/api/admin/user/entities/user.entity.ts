import { BeforeInsert, Column, Entity, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../../../common/entity/base.entity';
import { BcryptUtil } from '../../../../common/utils/bcrypt.util';
import { Role } from '../../roles/entities/role.entity';

@Entity({
  name: 'admin_user',
})
@Unique(['account'])
export class User extends BaseEntity {
  @Column({
    comment: '名字',
  })
  name: string;

  @Column({
    comment: '账号',
  })
  account: string;
  @Column({
    comment: '密码',
    select: false,
  })
  password: string;

  @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    const password = this.password || '123456';
    this.password = await BcryptUtil.hash(password);
  }
}
