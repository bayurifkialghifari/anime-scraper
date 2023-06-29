const Joi = require("joi");

const {BaseValidator} = require('@nandev/ndk');

class Ongoing extends BaseValidator {
  validateExample(req) {
    const Schema = Joi.object({
      page: Joi.number()
        .optional()
    })
    
    return this.validateQuery(Schema, req)
  }
}

module.exports = new Ongoing();
