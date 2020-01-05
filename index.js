
const fs = require('fs')
const Koa = require('koa')
const app = new Koa()
const Cron = require('cron').CronJob
const getFilmTimes = require('./src/getFilmTimes')
const everyMin = '* * * * *'
const everyDay = '0 0 * * *'

new Cron(everyMin, async () => {
  // Get films and times
  const result = await getFilmTimes()

  // Stringify results
  const json = JSON.stringify(result)

  // Write them all to disc
  try {
    fs.writeFileSync('data.json', json, 'utf8', () => { })
  } catch (err) {
    console.error(err)
  }
}, null, true)

app.use(async (ctx) => {
  // Read data file
  try {
    fs.readFileSync('data.json', 'utf8')
  } catch (err) {
    console.error(err)
  }

  // Parse file to then give to context body
  const result = JSON.parse(file)

  // Respond with result
  ctx.body = result
})

module.exports = app.callback()

