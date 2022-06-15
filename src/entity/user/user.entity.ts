import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 150,
    name: 'uuid',
    comment: 'uuid',
  })
  uuid: string;

  @Column('varchar', {
    nullable: false,
    name: 'salt',
    comment: '密码盐',
  })
  salt: string;

  @Column('varchar', {
    nullable: false,
    name: 'username',
    comment: '用户名',
  })
  username: string;

  @Column('varchar', {
    nullable: false,
    name: 'password',
    comment: '密码',
  })
  password: string;

  @Column('varchar', {
    name: 'email',
    length: 100,
    comment: '邮箱',
  })
  email: string;

  @Column('varchar', {
    nullable: false,
    name: 'avatar',
    comment: '头像',
  })
  avatar: string;

  @Column('int', {
    nullable: false,
    name: 'active',
    comment: '是否激活状态',
  })
  active: 0; // 0 未激活 1 激活

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at',
  })
  updateAt: Date;
}
