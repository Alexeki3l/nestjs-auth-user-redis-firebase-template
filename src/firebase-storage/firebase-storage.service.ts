import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateFirebaseStorageDto } from './dto/create-firebase-storage.dto';
import { CreateRediDto } from 'src/redis/dto/create-redi.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { RedisService } from 'src/redis/redis.service';
import * as admin from 'firebase-admin';
import { UsersService } from 'src/users/users.service';
import { customDate } from 'src/utils/custom-methods/custom.date';

@Injectable()
export class FirebaseStorageService {
  private db: FirebaseFirestore.Firestore;
  private formatImageList = [
    'jpeg',
    'jpg',
    'png',
    'gif',
    'bmp',
    'tiff',
    'tif',
    'webp',
    'svg',
    'ico',
    'heic',
    'heif',
    'raw',
    'psd',
    'pdf',
    'eps',
    'ai',
  ];

  constructor(
    @InjectRedis() private redisService: RedisService,
    @Inject() private readonly usersService: UsersService,
  ) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
    });
    this.db = admin.firestore();
  }

  // Método para probar Firebase
  async testFirebase(): Promise<void> {
    try {
      const docRef = this.db.collection('test').doc('testDoc');
      await docRef.set({
        testField: 'testValue',
      });
      console.log('Firebase está funcionando correctamente');
    } catch (error) {
      console.error('Error al probar Firebase:', error);
      throw error;
    }
  }

  // Método para subir archivos al bucket de Firebase
  async uploadFile(
    file: any,
    userName: string,
  ): Promise<CreateFirebaseStorageDto> {
    try {
      const user = await this.usersService.findOneByUsername(userName);
      if (!user) throw new UnauthorizedException('User not exists');

      const bucket = admin.storage().bucket();
      const fileUpload = bucket.file(file.originalname.split(' ').join('-'));

      await fileUpload.save(file.buffer);
      const metadata = await fileUpload.getMetadata();
      const create_At = metadata[0].timeCreated;
      const contentTypeFormatImage = metadata[0].contentType.split('/')[1];
      const publicURL: string = await this.getPublicUrl(
        bucket.name,
        fileUpload.name,
      );
      if (!this.formatImageList.includes(contentTypeFormatImage))
        throw new Error('File not supported');
      const createRedisDto: CreateRediDto = {
        userName,
        publicURL,
        create_At,
      };
      this.redisService.set(createRedisDto.userName, { ...createRedisDto });

      return { message: 'File uploaded successfully', status: 200 };
    } catch (error) {
      return {
        message: 'Error, file not support',
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  //Para obtener una ruta publica del archivo.
  async getPublicUrl(bucketName: string, fileName: string): Promise<any> {
    const storage = admin.storage();
    const bucket = storage.bucket();
    const fileRef = bucket.file(`${fileName}`);
    console.log(
      await fileRef.getSignedUrl({
        action: 'read',
        expires: customDate(),
      }),
    );
  }
}
