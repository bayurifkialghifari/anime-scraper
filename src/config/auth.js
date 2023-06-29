module.exports = {
  service_url: process.env.AUTH_SERVICE_URL || 'http://localhost:3000',
  cache: {
    prefix: 'auth_service:user:',
    ttl: 6 * 60 * 60
  }
}
