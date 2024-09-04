import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import UserReadModel from '../../../domain/read-models/user.read.model';
import { Role } from '../../../domain/enums/role.enum';

@Entity({
  schema: 'common',
  name: 'user',
})
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'github_id' })
  githubId: string;

  @Column()
  username: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column('simple-array')
  roles: string[];

  toModel() {
    return new UserReadModel(this.uuid, this.username, this.roles as Role[]);
  }
}
