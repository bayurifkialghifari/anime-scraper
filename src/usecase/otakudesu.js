const axios = require('axios');
const destination = require('../config/destination');
const cheerio = require('cheerio');

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
          const title = $(el).find('a').html()
          const link = $(el).find('a').attr('href').replace(destination.otakudesu, '')
          const image = $(el).find('img').attr('src')
          let rating = ''
          $(el).find('.set').each((i2, el2) => {
            if ($(el2).text().includes('Rating : ')) {
              rating = $(el2).text().replace('Rating : ', '')
            }
          })


          search.push({
            title,
            link,
            image,
            rating
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
          judul: $(".venser").find(".infozingle p").first().text().replace('Judul: ', ''),
          jepang: $(".venser").find(".infozingle p:nth-child(2)").text().replace('Japanese: ', ''),
          skor: $(".venser").find(".infozingle p:nth-child(3)").text().replace('Skor: ', ''),
          produser: $(".venser").find(".infozingle p:nth-child(4)").text().replace('Produser: ', ''),
          status: $(".venser").find(".infozingle p:nth-child(6)").text().replace('Status: ', ''),
          totaleps: $(".venser").find(".infozingle p:nth-child(7)").text().replace('Total Episode: ', ''),
          durasi: $(".venser").find(".infozingle p:nth-child(8)").text().replace('Durasi: ', ''),
          tanggalrilis: $(".venser").find(".infozingle p:nth-child(9)").text().replace('Tanggal Rilis: ', ''),
          studio: $(".venser").find(".infozingle p:nth-child(10)").text().replace('Studio: ', ''),
          genre: $(".venser").find(".infozingle p:nth-child(11)").text().replace('Genre: ', ''),
          sinopsis: $(".venser").find(".sinopc").text(),
        }

        $('.episodelist').each((i, el) => {
          $(el).find('ul').each((i2, el2) => {
            $(el2).find('li').each((i3, el3) => {
              const title = $(el3).find('a').text()
              const tanggal = $(el3).find('.zeebr').text()
              const link = $(el3).find('a').attr('href').replace(destination.otakudesu, '')

              // Ignore link lengkap :D
              if (!link.includes('lengkap')) {
                episode.push({
                  title,
                  tanggal,
                  link
                })
              }
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
        const link_download = {}
        const link_string = $(".responsive-embed-stream iframe").attr("src")
        const link_all_eps = $(".venser").find('.flir').find('a').filter(function() {
          return $(this).text().trim() === 'See All Episodes'
        }).attr('href').replace(destination.otakudesu, '')
        let next_eps = $(".venser").find('.flir').find('a').filter(function() {
          return $(this).text().trim() === 'Next Eps.'
        }).attr('href')
        let prev_eps = $(".venser").find('.flir').find('a').filter(function() {
          return $(this).text().trim() === 'Previous Eps.'
        }).attr('href')

        // Check next and prev eps button
        next_eps = next_eps ? next_eps.replace(destination.otakudesu, '') : false
        prev_eps = prev_eps ? prev_eps.replace(destination.otakudesu, '') : false

        // Get link download
        $(".venser").find(".download ul").find('li').each((i, el) => {
          link_download[$(el).find('strong').text()] = []

          $(el).find('a').each((i2, el2) => {
            link_download[$(el).find('strong').text()].push({
              name: $(el).find('strong').text() + ' ' + $(el2).text(),
              link: $(el2).attr('href'),
            })
          })
        })



        return {
          title,
          link_download,
          link_string,
          link_all_eps,
          next_eps,
          prev_eps
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
          const rating = $(el3).find('.epztipe').text().replace(' ', '')

          parseData.push({
            title,
            episode,
            link,
            image,
            rating
          })
        })
      })
    })

    return parseData
  }
}

module.exports = new OtakuDesu();
