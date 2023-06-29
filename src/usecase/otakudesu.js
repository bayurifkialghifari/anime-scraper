const axios = require('axios');
const destination = require('../config/destination');

class OtakuDesu {
  constructor() {
    this.client = axios.create({
      baseURL: destination.otakudesu,
      timeout: 30 * 1000
    })
  }

  async ongoing(page = 0) {
    let url = '/ongoing-anime'
    if (page) {
      url = '/ongoing-anime/page/' + page
    }

    return this.client
      .get('/')
      .then(response => response.data)
  }
}

module.exports = new OtakuDesu();