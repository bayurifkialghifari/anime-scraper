const Joi = require("joi");

const {BaseValidator} = require('@nandev/ndk');

class Complete extends BaseValidator {
  validateExample(req) {
    const Schema = Joi.object({
      page: Joi.number()
        .optional()
    })
    
    return this.validateQuery(Schema, req)
  }
}

module.exports = new Complete();
