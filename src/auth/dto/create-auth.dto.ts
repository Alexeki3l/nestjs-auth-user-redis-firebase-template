import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthRegisterDto {
  @ApiProperty({ example: 'wJk0S@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'kamil', description: 'User username' })
  username: string;

  @ApiProperty({ example: 'kamil123', description: 'User password' })
  password: string;

  @ApiProperty()
  token: string;
}

export class AuthLoginDto {
  @ApiProperty({ example: 'kamil', description: 'User username' })
  username: string;

  @ApiProperty({ example: 'kamil123', description: 'User password' })
  password: string;
}

export class CreateAuthUserDto {
  @ApiProperty({ example: 'wJk0S@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'kamil', description: 'User username' })
  username: string;

  @ApiProperty({ example: 'kamil123', description: 'User password' })
  password: string;
}

export class changeUserTokenDto {
  @ApiProperty({ example: 'kamil', description: 'User username' })
  username: string;

  @ApiProperty()
  token: string;
}
