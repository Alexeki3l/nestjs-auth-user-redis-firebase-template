import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FirebaseStorageService } from './firebase-storage.service';
// import { CreateFirebaseStorageDto } from './dto/create-firebase-storage.dto';
// import { UpdateFirebaseStorageDto } from './dto/update-firebase-storage.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { TestDto } from './dto/create-firebase-storage.dto';

@ApiTags('firebase-storage')
@Controller('firebase-storage')
export class FirebaseStorageController {
  constructor(
    private readonly firebaseStorageService: FirebaseStorageService,
  ) {}

  @Post('upload_file')
  @UseInterceptors(FileInterceptor('file')) // 'file' es el nombre del campo esperado en el form-data
  async uploadFile(@UploadedFile() file, @Body() { username }: any) {
    return await this.firebaseStorageService.uploadFile(file, username); // Implementa la lógica en tu servicio
  }

  @Post('public_url_file')
  async getPublicUrlFile(@Body() body: TestDto) {
    return await this.firebaseStorageService.getPublicUrl(
      body.bucketName,
      body.filename,
    );
  }
}
