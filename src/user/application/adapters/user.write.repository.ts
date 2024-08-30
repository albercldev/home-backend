import User from '../../domain/write-models/user.model';

export default abstract class UserWriteRepository {
  abstract createUser(user: User): Promise<string>;
  abstract getUsers(): Promise<User[]>;
}
