import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import LoginCommand from './login.command';
import UserWriteRepository from '../adapters/user.write.repository';
import User from '../../domain/write-models/user.model';

@CommandHandler(LoginCommand)
export default class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private readonly userRepository: UserWriteRepository) {}

  async execute(command: LoginCommand): Promise<User | null> {
    const user = await this.userRepository.findUserByUsername(command.username);

    if (user?.login(command.username, command.password)) {
      return user;
    }

    return null;
  }
}
