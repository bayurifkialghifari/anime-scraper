const {HTTPBaseHandler} = require('@nandev/ndk');

class AuthMiddleware extends HTTPBaseHandler{
  handleMiddleware(req, res, next) {
    const {authorization} = req.headers;
    if (authorization) {
      const jwtToken = authorization.split(' ')[1];
      
      if (jwtToken) {
        try {
          // TODO : Authentication service
          next();
        } catch (error) {
          return super.badRequest(res, error.message, error.stack)
        }
      } else {
        return super.unauthorized(res);
      }
    } else {
      return super.unauthorized(res);
    }
  }
}

module.exports = new AuthMiddleware();
