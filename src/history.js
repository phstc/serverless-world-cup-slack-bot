const AWS = require('aws-sdk')
const crypto = require('crypto')
const { todayEST } = require('./time')

let options = {}
if (process.env.IS_LOCAL) {
  // connect to DDB local
  options = {
    endpoint: 'http://localhost:8000',
    region: 'localhost'
  }
}
var dynamodb = new AWS.DynamoDB.DocumentClient(options)

const hash = msg => {
  return crypto
    .createHash('md5')
    .update(msg)
    .digest('hex')
}

const todayHistory = async () => {
  const today = todayEST()
  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  const result = await dynamodb
    .get({
      Key: {
        date: todayKey
      },
      TableName: process.env.HISTORY_TABLE
    })
    .promise()

  return result.Item || { date: todayKey, msgs: [] }
}

const upsertHistory = async history => {
  if (history.msgs.length === 0) {
    return
  }

  await dynamodb
    .put({ Item: history, TableName: process.env.HISTORY_TABLE })
    .promise()
}

const processMsgs = async msgs => {
  const history = await todayHistory()
  const uniqueMsgs = []
  msgs.forEach(msg => {
    const hashMsg = hash(msg)
    if (!history.msgs.includes(hashMsg)) {
      uniqueMsgs.push(msg)
      history.msgs.push(hashMsg)
    }
  })

  await upsertHistory(history)

  return uniqueMsgs
}

module.exports = processMsgs
