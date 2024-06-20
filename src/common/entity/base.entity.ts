import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class BaseEntity {
  //主键ID
  @PrimaryGeneratedColumn()
  id: number;

  //创建时间
  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  createTime: Date;

  //创建人
  @Column({ nullable: true })
  creator: string;

  //更新时间
  @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
  updateTime: Date;

  @Column({ nullable: true })
  // 更新人
  updater: string;

  // 更新次数
  @VersionColumn({
    select: false,
  })
  version: number;
}
