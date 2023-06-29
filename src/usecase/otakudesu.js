const axios = require('axios');
const destination = require('../config/destination');
const cheerio = require('cheerio');
const { on } = require('nodemon');

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
      .get(url)
      .then(response => response.data)
      .then(data => {
        const $ = cheerio.load(data)
        const ongoing = []
        // const pageAvailable = []
        // const pageActive = $('.current').text()
        $('.venz').each((i, el) => {
          $(el).find('ul').each((i2, el2) => {
            $(el2).find('li').each((i3, el3) => {
              const title = $(el3).find('h2').text()
              const episode = $(el3).find('.epz').text()
              const link = $(el3).find('a').attr('href')
              const image = $(el3).find('img').attr('src')

              ongoing.push({
                title,
                episode,
                link,
                image
              })
            })
          })          
        })

        return ongoing
      })
  }
}

module.exports = new OtakuDesu();