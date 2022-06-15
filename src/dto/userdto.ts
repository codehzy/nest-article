import { ApiPropertyOptional } from '@nestjs/swagger';

export class UsersDTO {
  uuid: string;

  @ApiPropertyOptional({
    description: '用户名',
  })
  username: string;

  salt: string;

  @ApiPropertyOptional({
    description: '密码',
  })
  password: string;

  @ApiPropertyOptional({
    description: '邮箱',
    maxLength: 100,
  })
  email: string;

  @ApiPropertyOptional({
    description: '头像',
  })
  avatar: string;

  @ApiPropertyOptional({
    description: '0 未激活 1 激活',
  })
  active: 0; // 0 未激活 1 激活

  createAt: Date;
  updateAt: Date;
}

export class UserFindByEmail {
  @ApiPropertyOptional({
    description: '邮箱',
  })
  email: string;
}

export class UserFindOne {
  @ApiPropertyOptional({
    description: 'uuid',
  })
  uuid: string;
}
