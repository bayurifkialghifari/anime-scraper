const {HTTPBaseHandler} = require('@nandev/ndk');

const OngoingValidator = require('../../../../validator/otakudesu/ongoing')
const CompleteValidator = require('../../../../validator/otakudesu/complete')

const OtakuDesuService = require('../../../../usecase/otakudesu');

class OtakuDesu extends HTTPBaseHandler {
  
  // Get ongoing anime
  ongoing(req, res) {
    const requestData = OngoingValidator.validateExample(req)
    
    return OtakuDesuService.ongoing(requestData.page ?? 0)
      .then(data => {
        return super.successResponse(res, 'Success!', data)
      })
      .catch(err => {
        return super.badRequest(res, err.message)
      })
  }

  // Get complete anime
  complete(req, res) {
    const requestData = CompleteValidator.validateExample(req)
    
    return OtakuDesuService.complete(requestData.page ?? 0)
      .then(data => {
        return super.successResponse(res, 'Success!', data)
      })
      .catch(err => {
        return super.badRequest(res, err.message)
      })
  }
}

module.exports = new OtakuDesu()
