const postMessage = require('./bot')
const processMatches = require('./matches')
const processMsgs = require('./history')

module.exports.matches = async (event, context) => {
  const msgs = await processMatches()

  if (msgs.length === 0) {
    return await postMessage(':sleeping: there are no matches today')
  }

  const uniqueMsgs = await processMsgs(msgs)
  if (uniqueMsgs.length > 0) {
    return await postMessage(uniqueMsgs.join('\n\n'))
  }

  return 'no new events'
}
