import { PartialType } from '@nestjs/swagger';
import { CreateFirebaseStorageDto } from './create-firebase-storage.dto';

export class UpdateFirebaseStorageDto extends PartialType(CreateFirebaseStorageDto) {}
