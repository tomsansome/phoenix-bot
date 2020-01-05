const fs = require('fs')
const Koa = require('koa')
const app = new Koa()
const Cron = require('cron').CronJob
const writeToDisc = require('./src/writeToDisc')
const everySec = '10 * * * * *'
const everyMin = '* * * * *'
const everyDay = '0 0 * * *'

// new Cron(everySec, async () => { writeToDisc() }, null, true)

app.use(async (ctx) => {
  // Read data file
  // try {
  //   fs.readFileSync('data.json', 'utf8')
  // } catch (err) {
  //   console.error(err)
  // }

  // Parse file to then give to context body
  // const result = JSON.parse(file)

  const result = await getFilmTimes()

  // Respond with result
  ctx.body = result
})

module.exports = app.callback()

