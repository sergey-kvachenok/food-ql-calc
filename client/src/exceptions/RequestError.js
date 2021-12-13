export class RequestError extends Error {
  constructor(status = '', responseData) {
    super();

    const errorData = responseData || {};

    // this.message = errorData.message || 'Default error';
    this.errors = errorData.errors;
    this.status = status;
    this.name = 'RequestError';
  }
}
