import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import UserReadModel from '../../domain/read-models/user.read.model';
import UserReadRepository from '../adapters/user.read.repository';
import FindUserByGithubIdQuery from './find-user-by-github-id.query';

@QueryHandler(FindUserByGithubIdQuery)
export default class FindUserByGithubIdHandler
  implements IQueryHandler<FindUserByGithubIdQuery>
{
  constructor(private readonly userRepository: UserReadRepository) {}

  execute(query: FindUserByGithubIdQuery): Promise<UserReadModel> {
    return this.userRepository.findUserByGithubId(query.id);
  }
}
