const axios = require('axios')

const getMatches = async () => {
  var url = 'https://worldcup.sfg.io/matches/today'

  const response = await axios.get(url)
  const matches = response.data

  return matches
}

module.exports = { getMatches }
