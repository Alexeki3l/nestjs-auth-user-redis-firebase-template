import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthUserDto,
  AuthLoginDto,
  changeUserTokenDto,
} from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async LogIn(@Body() createAuthDto: AuthLoginDto) {
    return await this.authService.LogIn(createAuthDto);
  }

  @Post('register')
  async Register(@Body() body: CreateAuthUserDto) {
    console.log(body);
    return await this.authService.Register(body);
  }

  @Post('change_token')
  async ChangeToken(@Body() body: changeUserTokenDto) {
    console.log(body);
    return await this.authService.ChangeToken(body);
  }
}
