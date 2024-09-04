export default class GenericDomainError extends Error {
  constructor(message: string) {
    super(message);
  }
}
