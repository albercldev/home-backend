import Deployment from '../../domain/write-models/deployment.model';

export default abstract class DeploymentWriteRepository {
  abstract create(deployment: Deployment): Promise<string>;
  abstract update(deployment: Deployment): Promise<void>;
  abstract delete(uuid: string): Promise<void>;

  abstract findById(uuid: string): Promise<Deployment>;
  abstract findByRepository(
    repository: string,
    repositoryOwner: string,
  ): Promise<Deployment>;
}
