import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { PhotoModule } from './photo/photo.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, PhotoModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
