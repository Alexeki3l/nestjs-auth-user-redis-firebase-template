import { ApiProperty } from '@nestjs/swagger';

export class CreateFirebaseStorageDto {
  message?: string;
  status?: number;
}

export class TestDto {
  @ApiProperty()
  bucketName?: string;
  @ApiProperty()
  filename?: string;
}
