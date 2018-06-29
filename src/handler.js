const postMessage = require('./bot')
const processMatches = require('./matches')
const processMsgs = require('./history')

module.exports.matches = async (event, context) => {
  const msgs = await processMatches()

  if (msgs.length === 0) {
    return ':sleeping: there are no matches today'
  }

  const uniqueMsgs = await processMsgs(msgs)
  if (uniqueMsgs.length > 0) {
    const joinedMsgs = uniqueMsgs.join('\n\n')
    postMessage(joinedMsgs)

    return joinedMsgs
  }

  return 'no new events'
}
