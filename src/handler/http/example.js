const {HTTPBaseHandler} = require('@nandev/ndk');

const ExampleValidator = require('../../validator/example')

const ExampleService = require('../../usecase/example');

class ExampleHandler extends HTTPBaseHandler {
  handleExample(req, res) {
    const validateData = ExampleValidator.validateExample(req)
    
    return ExampleService.example(validateData.name)
      .then(data => {
        return super.successResponse(res, 'Success!', data)
      })
      .catch(err => {
        return super.badRequest(res, err.message)
      })
  }
}

module.exports = new ExampleHandler()
