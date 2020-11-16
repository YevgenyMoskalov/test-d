class UserAuthError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = 'USER_AUTHORIZATION_ERROR';
  }
}

module.exports = UserAuthError;
