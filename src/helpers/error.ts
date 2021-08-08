class BoomerangError extends Error {

  constructor(message?: string) {
    if (!message) {
      message = 'Something went wrong.';
    }

    super(`[BoomerangError] ${message}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BoomerangError.prototype);
  }
}

export default BoomerangError;