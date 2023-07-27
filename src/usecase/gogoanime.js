const axios = require('axios');
const destination = require('../config/destination');
const cheerio = require('cheerio');

class GogoAnime {
  constructor() {
    this.client = axios.create({
      baseURL: destination.gogoanime,
      timeout: 30 * 1000
    })
  }

  // Ongoing
  async ongoing(page = 1) {
    let url = '/new-season.html?page=' + page

    return this.client
      .get(url)
      .then(response => response.data)
      .then(data => {
        return this.parseData(data)
      })
  }

  // Movies
  async movies(page = 1) {
    let url = '/anime-movies.html?page=' + page

    return this.client
      .get(url)
      .then(response => response.data)
      .then(data => {
        return this.parseData(data)
      })
  }

  // Popular
  async popular(page = 1) {
    let url = '/popular.html?page=' + page

    return this.client
      .get(url)
      .then(response => response.data)
      .then(data => {
        return this.parseData(data)
      })
  }

  // Parse data
  async parseData(data) {
    const $ = cheerio.load(data)

    const series = []

    $('.items').find('li').each((i, el) => {
      const title = $(el).find('a').attr('title')
      const link = $(el).find('a').attr('href').replace(destination.gogoanime, '')
      const image = $(el).find('img').attr('src')
      const realease = $(el).find('.released').html().replace('Released: ', '').replace(/\s/g, '')

      series.push({
        title,
        link,
        image,
        realease
      })
    })

    return series
  }
}

module.exports = new GogoAnime();