import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import DeploymentError from '../../../domain/errors/deployment.error';
import { Response } from 'express';
import GenericDomainError from '../../../../shared/domain/errors/generic-domain.error';

@Catch(GenericDomainError)
export default class GenericDomainFilter implements ExceptionFilter {
  private static readonly logger = new Logger(GenericDomainFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    if (exception instanceof DeploymentError) {
      this.buildHttpError(response, HttpStatus.FORBIDDEN, exception);
    } else {
      this.buildHttpError(
        response,
        HttpStatus.INTERNAL_SERVER_ERROR,
        exception,
      );
    }
  }

  buildHttpError(response: Response, status: HttpStatus, error: Error) {
    GenericDomainFilter.logger.error(
      `Error caught: ${error.message}`,
      error.stack,
    );
    response.status(status).json({
      statusCode: status,
      message: error.message,
      stack: error.stack,
    });
  }
}
