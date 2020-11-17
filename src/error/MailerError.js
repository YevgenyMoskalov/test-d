class MailerError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = 'MAILER_ERROR';
  }
}

module.exports = MailerError;
