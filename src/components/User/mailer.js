const nodemailer = require('nodemailer');
const MailerError = require('../../error/MailerError');

const transporter = nodemailer.createTransport({
  host: '127.0.0.1',
  port: 1025,
  auth: {
    user: 'user',
    pass: 'password',
  },
});

function sendMail(email) {
  const messageStatus = transporter.sendMail({
    from: 'lesnoy022@gmail.com',
    to: email,
    subject: 'Hi Mailhog!',
    text: 'This is the email content',
  });
  if (!messageStatus) {
    throw new MailerError('The letter was not sent');
  }
}

module.exports = {
  sendMail,
};
