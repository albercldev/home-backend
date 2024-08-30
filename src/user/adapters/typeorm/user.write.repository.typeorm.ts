import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import UserWriteRepository from '../../application/adapters/user.write.repository';
import { Role } from '../../domain/enums/role.enum';
import User from '../../domain/write-models/user.model';

@Injectable()
export default class UserWriteRepositoryTypeORM implements UserWriteRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: User): Promise<string> {
    let createdEntity = this.userRepository.create({
      username: user.username,
      email: user.email,
      passwordHash: user.passwordHash,
      roles: user.roles,
    });
    let savedUser = await this.userRepository.save(createdEntity);
    return savedUser.uuid;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      return new User(
        user.uuid,
        user.username,
        user.email,
        user.passwordHash,
        user.roles as Role[],
      );
    });
  }
}
