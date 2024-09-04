import GenericDomainError from '../../../shared/domain/errors/generic-domain.error';

export default class DeploymentError extends GenericDomainError {
  constructor(message = 'Unexpected deployment error') {
    super(message);
  }
}
