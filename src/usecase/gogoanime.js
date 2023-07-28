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
  async movies(page = 1, aph = '') {
    let url = '/anime-movies.html?aph='+aph+'&page=' + page

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

  // Search
  async search(page = 1, s = '') {
    let url = '/search.html?keyword='+s+'&page=' + page

    return this.client
      .get(url)
      .then(response => response.data)
      .then(data => {
        return this.parseData(data)
      })
  }

  // Get Detail
  async detail(slug) {
    let url = '/category/'+slug

    return this.client
      .get(url)
      .then(response => response.data)
      .then(async (data) => {
        const $ = cheerio.load(data)

        // Get anime id
        const animeId = $('input#movie_id').attr('value')
        // Get last eps
        const lastEps = $('ul#episode_page').find('li:last-child').find('a').attr('ep_end')
        // Get list eps
        const eps = await this.getListEps(animeId, lastEps)

        // Get detail
        const title = $('.anime_info_body_bg').find('h1').text()
        const image = $('.anime_info_body_bg').find('img').attr('src')
        let type = ''
        let summary = ''
        let genre = ''
        let realease = ''
        let status = ''
        let otherName = ''
        $('.anime_info_body_bg').find('.type').each((i, el) => {
          if ($(el).text().includes('Type:')) {
            type = $(el).find('a').text()
          }
          if ($(el).text().includes('Plot Summary:')) {
            summary = $(el).text().replace('Plot Summary: ', '')
          }
          if ($(el).text().includes('Genre:')) {
            genre = $(el).find('a').text()
          }
          if ($(el).text().includes('Released:')) {
            realease = $(el).text().replace('Released: ', '')
          }
          if ($(el).text().includes('Status:')) {
            status = $(el).find('a').text()
          }
          if ($(el).text().includes('Other name:')) {
            otherName = $(el).text().replace('Other name: ', '')
          }
        })

        return {
          animeId,
          title,
          image,
          type,
          summary,
          genre,
          realease,
          status,
          otherName,
          eps
        }
      })
  }

  // Get list eps
  async getListEps(animeId, lastEps) {
    const eps = []

    await axios
    .get(`https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=0&ep_end=${lastEps}&id=${animeId}`)
    .then(response => response.data)
    .then(data => {
      const $ = cheerio.load(data)
        
      $('#episode_related').find('li').each((i, el) => {
          const title = $(el).find('.name').text()
          const link = $(el).find('a').attr('href')

          eps.push({
            title,
            link,
          })
        })
    })
    
    return eps
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
