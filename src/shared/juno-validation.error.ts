class JunoValidationError extends Error {
  constructor(message: string = 'Something went wrong. Try again later') {
    super(message);

    this.name = 'JunoValidationError';
  }
}

export default JunoValidationError;
