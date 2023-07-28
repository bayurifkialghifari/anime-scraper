const {HTTPBaseHandler} = require('@nandev/ndk');

const GogoAnimeService = require('../../../../usecase/gogoanime');

class GogoAnime extends HTTPBaseHandler {
  
  // Get ongoing anime
  ongoing(req, res) {
    return GogoAnimeService.ongoing(req.query.page ?? 1)
      .then(data => {
        return super.successResponse(res, 'Success!', data)
      })
      .catch(err => {
        return super.badRequest(res, err.message)
      })
  }

  // Get anime movies
  movies(req, res) {
    return GogoAnimeService.movies(req.query.page ?? 1, req.query.aph ?? '')
      .then(data => {
        return super.successResponse(res, 'Success!', data)
      })
      .catch(err => {
        return super.badRequest(res, err.message)
      })
  }

  // Get popular anime
  popular(req, res) {
    return GogoAnimeService.popular(req.query.page ?? 1)
      .then(data => {
        return super.successResponse(res, 'Success!', data)
      })
      .catch(err => {
        return super.badRequest(res, err.message)
      })
  }

  // Search anime
  search(req, res) {
    return GogoAnimeService.search(req.query.page ?? 1, req.query.s ?? '')
      .then(data => {
        return super.successResponse(res, 'Success!', data)
      })
      .catch(err => {
        return super.badRequest(res, err.message)
      })
  }

  // Get anime detail
  detail(req, res) {
    return GogoAnimeService.detail(req.params.slug)
      .then(data => {
        return super.successResponse(res, 'Success!', data)
      })
      .catch(err => {
        return super.badRequest(res, err.message)
      })
  }
}

module.exports = new GogoAnime()
