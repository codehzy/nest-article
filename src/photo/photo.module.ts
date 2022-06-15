import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { photoProviders } from '../entity/photo/photo.providers';
import { DatabaseModule } from '../db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PhotoService, ...photoProviders],
  controllers: [PhotoController],
})
export class PhotoModule {}
