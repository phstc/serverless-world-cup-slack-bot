const postMessage = require('./bot')
const processMatches = require('./matches')
const processMsgs = require('./history')

module.exports.hello = async (event, context) => {
  const msgs = await processMatches()
  const uniqueMsgs = await processMsgs(msgs)
  if (uniqueMsgs.length > 0) {
    const joinedMsgs = uniqueMsgs.join('\n\n')
    postMessage(joinedMsgs)

    return joinedMsgs
  }

  return 'no new messages'
}
