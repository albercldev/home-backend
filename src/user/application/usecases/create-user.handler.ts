import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import UserWriteRepository from '../adapters/user.write.repository';
import User from '../../domain/write-models/user.model';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserWriteRepository) {}

  async execute(command: CreateUserCommand) {
    const user = User.create(command.username, command.password, command.roles);

    const id = await this.userRepository.createUser(user);
    user.commit();

    return id;
  }
}
