import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  schema: 'common',
  name: 'user',
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
}
