import UserReadModel from '../../domain/read-models/user.read.model';

export default abstract class UserReadRepository {
  abstract findUsers(): Promise<UserReadModel[]>;
  abstract findUser(uuid: string): Promise<UserReadModel>;
  abstract findUserByGithubId(githubId: string): Promise<UserReadModel>;
}
