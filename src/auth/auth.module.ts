import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { userProviders } from 'src/entity/user/user.providers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config';
import { JwtStrategy } from './strategy';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5min' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, ...userProviders, JwtStrategy],
})
export class AuthModule {}
