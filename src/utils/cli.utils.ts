import { exec } from 'child_process';
import { Logger } from '@nestjs/common';

export default class CliUtils {
  private static readonly logger = new Logger(CliUtils.name);

  static async run(command: string): Promise<number> {
    return new Promise<number>((resolve) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          resolve(error.code);
        }

        this.logger.debug(`Command finished: ${command}`);
        if (stdout) this.logger.debug(`stdout:\n${stdout}`);
        if (stderr) this.logger.error(`stderr:\n${stderr}`);

        resolve(0);
      });
    });
  }
}
