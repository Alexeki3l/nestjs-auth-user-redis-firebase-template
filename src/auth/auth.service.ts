import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthLoginDto,
  changeUserTokenDto,
  CreateAuthRegisterDto,
  CreateAuthUserDto,
} from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async LogIn(authLoginDto: AuthLoginDto) {
    const { username, password } = authLoginDto;
    const user = await this.usersService.findOneByUsername(username);
    if (!user)
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'User not found',
      });
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }
    return { user };
  }

  async Register(body: CreateAuthUserDto) {
    const user = await this.usersService.findOneByUsername(body.username);
    if (user) throw new ConflictException('User exists');
    const passwordHash = await bcrypt.hash(body.password, 10);
    console.log(`hash: ${passwordHash}`);
    const payload = {
      sub: body.username,
      password: passwordHash,
    };
    console.log(`payload: ${payload}`);
    const token = await this.jwtService.signAsync(payload);
    const newUser: CreateAuthRegisterDto = Object.assign(body, {
      token,
      password: passwordHash,
    });
    return await this.usersService.create(newUser);
  }

  async ChangeToken(body: changeUserTokenDto) {
    const user = await this.usersService.findOneByUsername(body.username);
    if (!user) throw new UnauthorizedException('User not exists');
    if (user.token !== body.token) {
      throw new UnauthorizedException('Token invalid');
    }
    const payload = await this.jwtService.decode(body.token);
    const newPasswordHash = await bcrypt.hash(payload.password, 10);

    const newPayload = { sub: payload.username, password: newPasswordHash };
    const newToken = await this.jwtService.signAsync(newPayload);

    return await this.usersService.update(user.id, {
      token: newToken,
      password: newPasswordHash,
    });
  }
}
