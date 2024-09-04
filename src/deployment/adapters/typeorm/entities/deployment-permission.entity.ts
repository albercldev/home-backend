import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import DeploymentEntity from './deployment.entity';
import DeploymentPermission from '../../../domain/write-models/deployment-permission.model';
import { Permission } from '../../../domain/enums/permission.enum';

@Entity({
  schema: 'common',
  name: 'deployment_permission',
})
export default class DeploymentPermissionEntity {
  @PrimaryColumn()
  user: string;

  @PrimaryColumn({ name: 'deployment' })
  deploymentUuid: string;

  @ManyToOne(() => DeploymentEntity, (deployment) => deployment.permissions)
  @JoinColumn({ name: 'deployment' })
  deployment: DeploymentEntity;

  @Column('simple-array')
  permissions: string[];

  toModel() {
    return new DeploymentPermission(
      this.user,
      this.permissions as Permission[],
    );
  }
}
