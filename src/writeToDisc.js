const getFilmTimes = require('./getFilmTimes')

module.exports = async () => {
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
}
