import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthLoginDto,
  CreateAuthRegisterDto,
  CreateAuthUserDto,
} from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async LogIn(authLoginDto: AuthLoginDto) {
    const { username, password } = authLoginDto;
    const user = this.usersService.findOneByUsername(username);
    if (!user)
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'User not found',
      });
    const is_Equals = await bcrypt.compare(password, user.password);
    if (is_Equals) return { user };
    throw new UnauthorizedException({
      statusCode: 401,
      message: 'Invalid credentials. Password is wrong',
    });
  }

  async Register(createAuthUserDto: CreateAuthUserDto) {
    const user = await this.usersService.findOneByUsername(
      createAuthUserDto.username,
    );
    if (user) throw new ConflictException('User exists');
    const password = await bcrypt.hash(createAuthUserDto.password, 10);
    const payload = {
      sub: createAuthUserDto.username,
      password,
    };
    const token = await this.jwtService.signAsync(payload);
    const newUser = Object.assign(createAuthUserDto, {
      token,
      password,
    });
    return await this.usersService.create(newUser);
  }
}
