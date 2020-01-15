const test = require('ava')
const getFilmTimes = require('../src/getFilmTimes')

test('Does a thing', async t => {
  const times = await getFilmTimes()

  console.log(times)

  t.pass()
})
