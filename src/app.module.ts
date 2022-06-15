import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [DatabaseModule, PhotoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
