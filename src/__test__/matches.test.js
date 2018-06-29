const processMatches = require('../matches')

jest.mock('../api')

let msgs

beforeAll(async () => {
  msgs = await processMatches()
})

test('number of messages ', async () => {
  expect(msgs).toHaveLength(5)
})

test('future matches', async () => {
  expect(msgs[0]).toEqual(
    ':timer_clock: The match between Brazil and Switzerland is about to start!'
  )
  // TODO figure out the date matcher
  expect(msgs[1]).toContain(':timer_clock: Brazil / Croatia is playing today')
})

test('completed matches', async () => {
  expect(msgs[2]).toEqual(
    ':timer_clock: The match in between Brazil and Switzerland is over\n> Brazil 1 x Switzerland 1'
  )
})

test('in progress matches', async () => {
  expect(msgs[3]).toEqual(
    ":soccer: GOOOOAL!!!\n> Philippe Coutinho (20') Brazil 1 x Switzerland 1"
  )
  expect(msgs[4]).toEqual(
    ":warning: Yellow card!!!\n> Valon Behrami (68') Switzerland"
  )
})
