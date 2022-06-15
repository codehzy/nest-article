import { Controller, Get } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Get('findAll')
  async findAll() {
    return await this.photoService.findAll();
  }
}
