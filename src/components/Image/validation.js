const Validation = require('../validation');

class ImageValidation extends Validation {
  getRange(data) {
    return this.Joi
      .object({
        first_date: this.Joi.date().max('now').required(),
        last_date: this.Joi.date().max('now').required(),
      })
      .validate(data);
  }

  crop(data) {
    return this.Joi
      .object({
        x: this.Joi.number().positive().required(),
        y: this.Joi.number().positive().required(),
      })
      .validate(data);
  }

  resize(data) {
    return this.Joi
      .object({
        width: this.Joi.number().positive().required(),
        height: this.Joi.number().positive().required(),
      })
      .validate(data);
  }
}
module.exports = new ImageValidation();
