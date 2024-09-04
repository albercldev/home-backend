import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import { Repository } from 'typeorm';
import UserReadRepository from '../../application/adapters/user.read.repository';
import UserReadModel from '../../domain/read-models/user.read.model';

@Injectable()
export default class TypeOrmUserReadRepository extends UserReadRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async findUsers(): Promise<UserReadModel[]> {
    const entities = await this.userRepository.find();

    return entities.map((entity) => entity.toModel());
  }

  async findUser(uuid: string): Promise<UserReadModel> {
    const entity = await this.userRepository.findOne({
      where: { uuid },
    });

    return entity?.toModel();
  }

  async findUserByGithubId(githubId: string): Promise<UserReadModel> {
    const entity = await this.userRepository.findOne({
      where: { githubId },
    });

    return entity?.toModel();
  }
}
