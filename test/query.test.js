const test = require('ava')
const moment = require('moment')
const fetch = require('node-fetch')

test('Queries the URL for JSON response', async t => {
  const date = '2020-01-11T12:00:00Z'
  const dow = moment(date).isoWeekday()

  new Promise(resolve => {
    return fetch('https://phoenix-bot.now.sh').then(res => res.json()).then(json => {
      console.log(json)
      const hi = json.find(day => moment(day.dateIso).isoWeekday() === dow)
      console.log(hi)
      return resolve()
    })
  })


  function playMusic(agent) {
    return new Promise((resolve, reject) => { // this is the workaround
      let music = request.body.queryResult.parameters["music"];
      agent.add(`Trying to play ${music}...`);
      spotify
        .searchv2(music)
        .then(result => { // spotify promise
          smartthings.sonos("playTrack", result).then(result => { // sonos promise
            agent.add(result);
            resolve(); // this is for the workaround
          });
        })
        .catch(error => {
          agent.add(`Error: ${error}`);
          resolve(); // this is for the workaround
        });
    });
  }

  function films(agent) {
    const date = agent.parameters.date;
    const getDay = getDay(date);

    return new Promise((resolve, reject) => {
      fetch('https://phoenix-bot.now.sh').then(res => res.json()).then(json => {
        const { films } = json.find(day => moment(day.dateIso).isoWeekday() === getDay.dow);

        agent.add(`For ${getDay.day} we are showing...`)

        films.map(film => {
          agent.add(film.title)
        })

        resolve()
      });
    });
  }

  t.pass()
})
