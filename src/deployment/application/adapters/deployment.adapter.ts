import Deployment from '../../domain/write-models/deployment.model';

export default abstract class DeploymentAdapter {
  abstract deploy(deployment: Deployment): Promise<void>;
  abstract start(deployment: Deployment): Promise<void>;
  abstract stop(deployment: Deployment): Promise<void>;
  abstract restart(deployment: Deployment): Promise<void>;
  abstract remove(deployment: Deployment): Promise<void>;
  abstract redeploy(deployment: Deployment): Promise<void>;
  abstract setEnvironmentFile(config: any): void;
}
