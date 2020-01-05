const Koa = require('koa')
const app = new Koa()
const getFilmTimes = require('./src/getFilmTimes')

app.use(async (ctx) => {
  const result = await getFilmTimes()
  ctx.body = result
})

module.exports = app.callback()

