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

  // Detail anime
  detail(req, res) {
    return OtakuDesuService.detail(req)
      .then(data => {
        return super.successResponse(res, 'Success!', data)
      })
      .catch(err => {
        return super.badRequest(res, err.message)
      })
  }

  // Episode anime
  episode(req, res) {
    return OtakuDesuService.episode(req)
      .then(data => {
        return super.successResponse(res, 'Success!', data)
      })
      .catch(err => {
        return super.badRequest(res, err.message)
      })
  }

  // Search anime
  search(req, res) {
    return OtakuDesuService.search(req)
      .then(data => {
        return super.successResponse(res, 'Success!', data)
      })
      .catch(err => {
        return super.badRequest(res, err.message)
      })
  }
}

module.exports = new OtakuDesu()
