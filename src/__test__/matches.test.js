const processMatches = require('../matches')

jest.mock('../api')

test('no new events', async () => {
  const msgs = await processMatches()

  expect(msgs).toHaveLength(3)
  expect(msgs[0]).toEqual(
    ':timer_clock: The match between Brazil and Switzerland is about to start!'
  )
  // TODO figure out the date matcher
  expect(msgs[1]).toContain(':timer_clock: Brazil / Croatia is playing today')
  expect(msgs[2]).toEqual(
    ':timer_clock: The match in between Brazil and Switzerland is over\n> Brazil 1 x Switzerland 1'
  )
})
