const localTime = datetime => {
  // (╯°□°）╯︵ ┻━┻
  // Convert UTC to EST
  return new Date(
    new Date(Date.parse(datetime)).toLocaleString('en-US', {
      timeZone: 'America/New_York'
    })
  )
}

const todayEST = () => {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
  )
}

module.exports = {
  localTime,
  todayEST
}
