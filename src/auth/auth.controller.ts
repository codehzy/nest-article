import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CODE } from 'src/code/code';
import { AuthGuard } from '@nestjs/passport';
import { authDto, loginData } from 'src/dto/authdto';

@Controller('auth')
@ApiTags('用户认证模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 用户登录
   * @param body 登录信息
   */
  @Post('login')
  @ApiOperation({
    summary: '用户登录',
  })
  async login(@Body() body: loginData) {
    const { email, password } = body;

    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser({ email, password });

    switch (authResult.code) {
      case CODE.HTTP_OK:
        return this.authService.certificate(authResult.user);
      case CODE.REP_WARNING:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  @Post('register')
  @ApiOperation({
    summary: '注册',
  })
  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  async register(@Body() body: authDto) {
    return await this.authService.register(body);
  }
}
