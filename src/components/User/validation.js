const Validation = require('../validation');

class UserValidation extends Validation {
  signin(data) {
    return this.Joi
      .object({
        email: this.Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: this.Joi.string().required(),
      })
      .validate(data);
  }

  create(profile) {
    return this.Joi
      .object({
        email: this.Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: this.Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        name: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
      })
      .validate(profile);
  }
}
module.exports = new UserValidation();
