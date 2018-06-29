const { WebClient } = require('@slack/client')

const SLACK_TOKEN = process.env.SLACK_TOKEN
const SLACK_CHANNEL = process.env.SLACK_CHANNEL
const SLACK_BOT_NAME = process.env.SLACK_BOT_NAME

const postMessage = async text => {
  const web = new WebClient(SLACK_TOKEN)

  await web.chat.postMessage({
    channel: SLACK_CHANNEL,
    text,
    username: SLACK_BOT_NAME,
    parse: 'full'
  })

  return text
}

module.exports = postMessage
