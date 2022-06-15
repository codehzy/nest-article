import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { UsersDTO } from './userdto';

export class authDto extends UsersDTO {}

export class registerDTO extends OmitType(UsersDTO, ['salt']) {}

export class loginData {
  @ApiPropertyOptional({
    description: '邮箱',
  })
  email: string;

  @ApiPropertyOptional({
    description: '密码',
  })
  password: string;
}
