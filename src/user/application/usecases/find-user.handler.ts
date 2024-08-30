import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import UserReadModel from '../../domain/read-models/user.read.model';
import UserReadRepository from '../adapters/user.read.repository';
import FindUserQuery from './find-user.query';

@QueryHandler(FindUserQuery)
export default class FindUserHandler implements IQueryHandler<FindUserQuery> {
  constructor(private readonly userRepository: UserReadRepository) {}

  execute(query: FindUserQuery): Promise<UserReadModel> {
    return this.userRepository.findUser(query.uuid);
  }
}
