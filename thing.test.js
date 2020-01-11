const test = require('ava')
const moment = require('moment')

test('Does a thing', async t => {
  const hours = [
    {
      day: "Monday",
      dow: 1,
      open: "09:00",
      close: "21:00",
      hours: "9am - 9pm"
    },
    {
      day: "Tuesday",
      dow: 2,
      open: "09:00",
      close: "21:00",
      hours: "9am - 9pm"
    },
    {
      day: "Wednesday",
      dow: 3,
      open: "09:00",
      close: "21:00",
      hours: "9am - 9pm"
    },
    {
      day: "Thursday",
      dow: 4,
      open: "09:00",
      close: "21:00",
      hours: "9am - 9pm"
    },
    {
      day: "Friday",
      dow: 5,
      open: "09:00",
      close: "21:00",
      hours: "9am - 9pm"
    },
    {
      day: "Saturday",
      dow: 6,
      open: "10:00",
      close: "21:00",
      hours: "10am - 9pm"
    },
    {
      day: "Sunday",
      dow: 7,
      open: "10:00",
      close: "21:00",
      hours: "10am - 9pm"
    }
  ]

  const format = 'HH:mm'

  const now = moment()
  const dayNumber = now.isoWeekday()

  const dayObject = hours.find(h => h.dow === dayNumber)
  const openTime = moment(dayObject.open, format)
  const closeTime = moment(dayObject.close, format)

  const currentlyOpen = now.isBetween(openTime, closeTime)

  console.log('Currently open ? ', currentlyOpen)

  t.pass()
})
