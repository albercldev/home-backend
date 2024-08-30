import UserReadModel from '../../user/domain/read-models/user.read.model';

export default interface AuthenticatedRequest extends Request {
  user: UserReadModel;
}
