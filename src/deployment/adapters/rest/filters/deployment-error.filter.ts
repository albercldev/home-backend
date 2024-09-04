import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import GitServerUnauthorizedError from '../../../domain/errors/git-server-unauthorized.error';
import { Response } from 'express';

@Catch(Error)
export default class DeploymentErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    if (exception instanceof GitServerUnauthorizedError) {
      this.buildHttpError(response, HttpStatus.FORBIDDEN, exception.message);
    }
  }

  buildHttpError(response: Response, status: HttpStatus, message: string) {
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
