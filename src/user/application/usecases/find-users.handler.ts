import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import FindUsersQuery from './find-users.query';
import UserReadModel from '../../domain/read-models/user.read.model';
import UserReadRepository from '../adapters/user.read.repository';

@QueryHandler(FindUsersQuery)
export default class FindUsersHandler implements IQueryHandler<FindUsersQuery> {
  constructor(private readonly userRepository: UserReadRepository) {}

  execute(query: FindUsersQuery): Promise<UserReadModel[]> {
    return this.userRepository.findUsers();
  }
}
