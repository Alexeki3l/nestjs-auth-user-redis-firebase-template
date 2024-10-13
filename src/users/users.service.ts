import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityUser } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(EntityUser)
    private repositoryUser: Repository<EntityUser>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.repositoryUser.save(createUserDto);
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  findOneByUsername(username: string) {
    return this.repositoryUser.findOne({ where: { username } });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
