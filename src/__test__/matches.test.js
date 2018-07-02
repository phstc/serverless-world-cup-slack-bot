const processMatches = require('../matches')

jest.mock('../api')

let msgs

beforeAll(async () => {
  msgs = await processMatches()
})

test('number of messages ', async () => {
  expect(msgs).toHaveLength(7)
})

test('future matches', async () => {
  expect(msgs[0]).toEqual(
    ':timer_clock: The match between Brazil and Switzerland is about to start!'
  )
})

test('completed matches', async () => {
  expect(msgs[1]).toEqual(
    ':timer_clock: The match in between Brazil and Switzerland is over\n> Brazil 1 x Switzerland 1'
  )
})

test('in progress matches', async () => {
  expect(msgs[2]).toEqual(
    ":soccer: GOOOOAL!!!\n> Philippe Coutinho (20') Brazil"
  )
  expect(msgs[3]).toEqual(
    ":warning: Yellow card!!!\n> Valon Behrami (68') Switzerland"
  )
  expect(msgs[4]).toEqual(
    ":exclamation: Red card!!!\n> Fake Player (90') Switzerland"
  )
  expect(msgs[5]).toEqual(
    ":soccer: GOOOOAL penalty!!!\n> Fake Player (90') Switzerland"
  )
  expect(msgs[6]).toEqual(':soccer: Brazil 1 x Switzerland 1')
})
