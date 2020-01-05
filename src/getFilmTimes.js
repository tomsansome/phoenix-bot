const moment = require('moment')
const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')

module.exports = async () => {
  let result = []

  const url = 'https://www.phoenix.org.uk/whats-on/?category=cinema&view=list'

  const fetchTextAndDom = async url => {
    const data = await fetch(url).then(r => r.text())
    return new JSDOM(data).window.document
  }

  const doc = await fetchTextAndDom(url)

  const days = doc.querySelectorAll('.blockheading')
  const daysArray = [...days]
  daysArray.splice(0, 1)
  daysArray.splice(7, 9)

  let i = 0

  const getFilmsForDay = day => {
    let result = []

    const sections = doc.querySelectorAll('.listing--whats-on')
    const sectionsArray = [...sections]

    const films = sectionsArray[day].querySelectorAll('.listing__item')

    for (const film of films) {
      const filmTitle = film.querySelector('.media__title a').textContent.trim()
      const cleanTitle = filmTitle.split('/')[1].trim()

      const times = film.querySelectorAll('.listing__showing')

      let timesResult = []
      for (const time of times) {
        timesResult.push(time.querySelector('.button').textContent.trim())
      }

      result.push({
        film: cleanTitle,
        times: timesResult
      })
    }

    return result
  }

  for (const day of daysArray) {
    const date = day.textContent
    const dateFormatted = moment(date).format('DDMMYYYY')
    const films = getFilmsForDay(i)
    result.push({ date, dateFormatted, films })
    i++
  }

  return result
}
