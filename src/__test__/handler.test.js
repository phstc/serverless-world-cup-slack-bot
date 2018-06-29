const handler = require('../handler')

jest.mock('../bot')
jest.mock('../matches')
jest.mock('../history')

const postMessage = require('../bot')
const processMatches = require('../matches')
const processMsgs = require('../history')

beforeEach(() => {
  postMessage.mockReset()
  processMatches.mockReset()
  processMsgs.mockReset()
})

test('no matches today', async () => {
  msgs = [':sleeping: there are no matches today']
  processMatches.mockImplementation(() => [])
  processMsgs.mockImplementation(() => msgs)

  await handler.matches()

  expect(postMessage).toBeCalledWith(msgs[0])
})

test('new messages', async () => {
  msgs = ['match about to start']
  processMatches.mockImplementation(() => msgs)
  processMsgs.mockImplementation(() => msgs)

  await handler.matches()

  expect(postMessage).toBeCalledWith(msgs[0])
})

test('no new messages', async () => {
  processMatches.mockImplementation(() => ['repeated msg'])
  processMsgs.mockImplementation(() => [])

  const result = await handler.matches()

  expect(result).toEqual('no new events')
})
