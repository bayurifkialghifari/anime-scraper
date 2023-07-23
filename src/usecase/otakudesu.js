const axios = require('axios');
const destination = require('../config/destination');
const cheerio = require('cheerio');
const { on } = require('nodemon');
const e = require('cors');

class OtakuDesu {
  constructor() {
    this.client = axios.create({
      baseURL: destination.otakudesu,
      timeout: 30 * 1000
    })
  }

  // Get ongoing anime
  async ongoing(page = 0) {
    let url = '/ongoing-anime'
    if (page) {
      url = '/ongoing-anime/page/' + page
    }

    return this.client
      .get(url)
      .then(response => response.data)
      .then(data => {
        return this.parseData(data)
      })
  }

  // Get complete anime
  async complete(page = 0) {
    let url = '/complete-anime'
    if (page) {
      url = '/complete-anime/page/' + page
    }

    return this.client
      .get(url)
      .then(response => response.data)
      .then(data => {
        return this.parseData(data)
      })
  }

  // Search anime
  async search(req) {
    const { s } = req.query
    const url = '/?s=' + s + '&post_type=anime'

    return this.client
      .get(url)
      .then(response => response.data)
      .then(data => {
        const $ = cheerio.load(data)
        const search = []

        $('.chivsrc').find('li').each((i, el) => {
          const title = $(el).find('a').text()
          const link = $(el).find('a').attr('href').replace(destination.otakudesu, '')
          const image = $(el).find('img').attr('src')


          search.push({
            title,
            link,
            image
          })
        })

        return search
      })
  }

  // Detail anime
  async detail(req) {
    const { detail } = req.params
    const url = '/anime/' + detail

    return this.client
      .get(url)
      .then(response => response.data)
      .then(data => {
        const $ = cheerio.load(data)
        const episode = []
        const detail = {
          fotonime: $(".venser").find(".fotoanime img").attr("src"),
          judul: $(".venser").find(".infozingle p").first().text(),
          skor: $(".venser").find(".infozingle p:nth-child(3)").text(),
          produser: $(".venser").find(".infozingle p:nth-child(4)").text(),
          status: $(".venser").find(".infozingle p:nth-child(6)").text(),
          totaleps: $(".venser").find(".infozingle p:nth-child(7)").text(),
          studio: $(".venser").find(".infozingle p:nth-child(10)").text(),
          genre: $(".venser").find(".infozingle p:nth-child(11)").text(),
          sinopsis: $(".venser").find(".sinopc").text(),
        }

        $('.episodelist').each((i, el) => {
          $(el).find('ul').each((i2, el2) => {
            $(el2).find('li').each((i3, el3) => {
              const title = $(el3).find('a').text()
              const link = $(el3).find('a').attr('href').replace(destination.otakudesu, '')
              episode.push({
                title,
                link
              })
            })
          })
        })
        
        return {
          detail,
          episode
        }
      })
  }

  // Episode anime
  async episode(req) {
    const { detail } = req.params
    const url = '/episode/' + detail

    return this.client
      .get(url)
      .then(response => response.data)
      .then(async data => {
        const $ = cheerio.load(data)

        const title = $(".venser").find(".posttl").text()
        const link_string = $(".responsive-embed-stream iframe").attr("src")
        const download = $(".venser").find(".download ul").html()
          
        return {
          title,
          link_string,
          download
        }
      })
  }
    

  // Parse data 
  async parseData(data) {
    const $ = cheerio.load(data)
    const parseData = [] 
    // const pageAvailable = []
    // const pageActive = $('.current').text()
    $('.venz').each((i, el) => {
      $(el).find('ul').each((i2, el2) => {
        $(el2).find('li').each((i3, el3) => {
          const title = $(el3).find('h2').text()
          const episode = $(el3).find('.epz').text()
          const link = $(el3).find('a').attr('href').replace(destination.otakudesu, '')
          const image = $(el3).find('img').attr('src')

          parseData.push({
            title,
            episode,
            link,
            image
          })
        })
      })          
    })

    return parseData
  }
}

module.exports = new OtakuDesu();