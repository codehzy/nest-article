import { encryptPassword } from 'src/utils/cryptogram';
import { authDto, loginData, registerDTO } from 'src/dto/authdto';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CODE } from 'src/code/code';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  // 校验用户信息
  async validateUser({ email, password }: loginData) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const { password: PWD, salt } = user;
      const hashPassword = encryptPassword(password, salt);
      if (hashPassword === PWD) {
        return {
          code: CODE.HTTP_OK,
          user,
        };
      } else {
        return {
          code: CODE.HTTP_OK,
          message: '用户名或者密码错误',
        };
      }
    } else {
      return {
        code: CODE.REP_WARNING,
        message: '用户不存在',
      };
    }
  }

  async certificate(user: authDto) {
    const { email, password } = user;
    const payload = Object.assign({ email, password });
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: CODE.HTTP_OK,
        data: {
          token,
        },
      };
    } catch (error) {
      return {
        code: CODE.REP_WARNING,
        msg: '账号或密码错误',
      };
    }
  }

  async register(body: registerDTO) {
    return await this.usersService.authRegister(body);
  }
}
