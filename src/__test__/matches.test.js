const processMatches = require('../matches')

jest.mock('../api')

// TODO add more tests based on fixtures when https://worldcup.sfg.io/matches/today starts returning matches
test('no new events', async () => {
  const msgs = await processMatches()

  expect(msgs).toHaveLength(0)
})
