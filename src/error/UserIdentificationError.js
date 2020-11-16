class UserIdentificationError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = 'USER_IDENTIFICATION_ERROR';
  }
}

module.exports = UserIdentificationError;
