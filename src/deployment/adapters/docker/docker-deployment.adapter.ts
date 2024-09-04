import Deployment from 'src/deployment/domain/write-models/deployment.model';
import DeploymentAdapter from '../../application/adapters/deployment.adapter';
import { Injectable, Logger } from '@nestjs/common';
import { AppConfig } from '../../../config/app.config';
import { ConfigService } from '@nestjs/config';
import {
  createDirectoryIfNotExists,
  ensureDirectoryAccess,
} from '../../../utils/fs.utils';
import GitServerUnauthorizedError from '../../domain/errors/git-server-unauthorized.error';
import CliUtils from '../../../utils/cli.utils';

@Injectable()
export default class DockerDeploymentAdapter extends DeploymentAdapter {
  private readonly logger = new Logger(DockerDeploymentAdapter.name);

  private readonly deploysPath: string;
  private readonly gitConfig: AppConfig['git'];

  constructor(readonly configService: ConfigService<AppConfig>) {
    super();
    this.deploysPath = this.configService.get('container.composes.directory');
    this.gitConfig = this.configService.get('git');
  }

  async deploy(deployment: Deployment): Promise<void> {
    await ensureDirectoryAccess(this.deploysPath);

    await createDirectoryIfNotExists(
      `${this.deploysPath}/${deployment.repositoryOwner}/${deployment.repository}`,
    );

    // Deploy the repository with git clone docker-compose.yaml
    const gitCloneStatus = await CliUtils.run(
      `git clone https://${this.gitConfig.token}@${this.gitConfig.server}/${deployment.repositoryOwner}/${deployment.repository}`,
    );

    if (gitCloneStatus === 128) throw new GitServerUnauthorizedError();

    await CliUtils.run(
      `cp -r ${deployment.repository}/docker-compose.yaml ${this.deploysPath}/${deployment.repositoryOwner}/${deployment.repository}`,
    );

    await CliUtils.run(`rm -rf ${deployment.repository}`);

    // Deploy the repository with docker-compose up -d
    this.logger.log(
      `Deploying ${deployment.repositoryOwner}/${deployment.repository}...`,
    );
    // Write .env file
    this.setEnvironmentFile(deployment);
    await CliUtils.run(
      `docker-compose -f ${this.deploysPath}/${deployment.repositoryOwner}/${deployment.repository}/docker-compose.yaml up -d --no-start`,
    );

    await this.start(deployment);
  }

  async start(deployment: Deployment): Promise<void> {
    this.logger.log(
      `Starting ${deployment.repositoryOwner}/${deployment.repository}...`,
    );
    CliUtils.run(
      `docker-compose -f ${this.deploysPath}/${deployment.repositoryOwner}/${deployment.repository}/docker-compose.yaml start`,
    );
  }

  async stop(deployment: Deployment): Promise<void> {
    this.logger.log(
      `Stopping ${deployment.repositoryOwner}/${deployment.repository}...`,
    );
    CliUtils.run(
      `docker-compose -f ${this.deploysPath}/${deployment.repositoryOwner}/${deployment.repository}/docker-compose.yaml stop`,
    );
  }

  async restart(deployment: Deployment): Promise<void> {
    this.logger.log(
      `Restarting ${deployment.repositoryOwner}/${deployment.repository}...`,
    );
    CliUtils.run(
      `docker-compose -f ${this.deploysPath}/${deployment.repositoryOwner}/${deployment.repository}/docker-compose.yaml restart`,
    );
  }

  async remove(deployment: Deployment): Promise<void> {
    this.logger.log(
      `Removing ${deployment.repositoryOwner}/${deployment.repository}...`,
    );
    CliUtils.run(
      `docker-compose -f ${this.deploysPath}/${deployment.repositoryOwner}/${deployment.repository}/docker-compose.yaml down`,
    );
  }

  async redeploy(deployment: Deployment): Promise<void> {
    await this.remove(deployment);
    await this.deploy(deployment);
  }

  setEnvironmentFile(deployment: Deployment): void {
    this.logger.log('Setting environment file...');
    const envPath = `${this.deploysPath}/${deployment.repositoryOwner}/${deployment.repository}/.env`;

    CliUtils.run(`echo "${deployment.environment}" > ${envPath}`);
  }
}
