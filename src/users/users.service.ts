import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityUser } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(EntityUser)
    private repositoryUser: Repository<EntityUser>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.repositoryUser.save(createUserDto);
  }

  async findOneByUsername(username: string) {
    return await this.repositoryUser.findOne({ where: { username } });
  }

  async findOneByID(id: string) {
    return await this.repositoryUser.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Encuentra el usuario por su id
    const user = await this.findOneByID(id);

    if (!user) {
      throw new Error('User not found');
    }
    // Aplica los cambios al objeto de usuario cargado
    Object.assign(user, updateUserDto);

    // Guarda el usuario actualizado
    return await this.repositoryUser.save(user);
  }
}
