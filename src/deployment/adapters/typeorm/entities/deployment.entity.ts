import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import DeploymentPermissionEntity from './deployment-permission.entity';
import Deployment from '../../../domain/write-models/deployment.model';

@Entity({
  schema: 'common',
  name: 'deployment',
})
export default class DeploymentEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  repository: string;

  @Column({ name: 'repository_owner' })
  repositoryOwner: string;

  @OneToMany(
    () => DeploymentPermissionEntity,
    (permission) => permission.deployment,
    { cascade: true, eager: true },
  )
  @JoinTable()
  permissions: DeploymentPermissionEntity[];

  @Column()
  environment: string;

  toModel() {
    return new Deployment(
      this.uuid,
      this.name,
      this.repository,
      this.repositoryOwner,
      this.permissions.map((permission) => permission.toModel()),
      this.environment,
    );
  }
}
