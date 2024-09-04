export default class GitServerUnauthorizedError extends Error {
  constructor() {
    super('Unauthorized to access the git server');
  }
}
