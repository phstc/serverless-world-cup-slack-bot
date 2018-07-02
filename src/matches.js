const { getMatches } = require('./api')
const { localTime } = require('./time')

const msgs = []

const append = msg => {
  msgs.push(msg)
}

const processFutureMatch = match => {
  const startAt = localTime(match.datetime)
  const now = localTime(new Date().toISOString())
  const diff = Math.floor((startAt - now) / (1000 * 60))

  if (diff < 2) {
    append(
      `:timer_clock: The match between ${match.home_team_country} and ${
        match.away_team_country
      } is about to start!`
    )
  }
}

const processCompletedMatch = match => {
  append(
    `:timer_clock: The match in between ${match.home_team.country} and ${
      match.away_team.country
    } is over\n> ${match.home_team.country} ${match.home_team.goals} x ${
      match.away_team.country
    } ${match.away_team.goals}`
  )
}

const processInProgressMatch = match => {
  processInProgressEvents(match.home_team, match, match.home_team_events)
  processInProgressEvents(match.away_team, match, match.away_team_events)

  processInProgressGoals(match)
}

const processInProgressGoals = match => {
  if (
    (match.home_team && match.home_team.goals && match.home_team.goals) > 0 ||
    (match.away_team && match.away_team.goals && match.away_team.goals > 0)
  ) {
    append(
      `:soccer: ${match.home_team.country} ${match.home_team.goals} x ${
        match.away_team.country
      } ${match.away_team.goals}`
    )
  }
}

const processInProgressEvents = (team, match, events) => {
  events.forEach(event => {
    switch (event.type_of_event) {
      case 'goal':
        append(
          `:soccer: GOOOOAL!!!\n> ${event.player} (${event.time}) ${
            team.country
          }`
        )
        break
      case 'goal-own':
        append(
          `:face_palm: OWN GOOOOAL!!!\n> ${event.player} (${event.time}) ${
            team.country
          }`
        )
        break
      case 'goal-penalty':
        append(
          `:soccer: GOOOOAL penalty!!!\n> ${event.player} (${event.time}) ${
            team.country
          }`
        )
        break
      case 'yellow-card':
        append(
          `:warning: Yellow card!!!\n> ${event.player} (${event.time}) ${
            team.country
          }`
        )
        break
      case 'red-card':
        append(
          `:exclamation: Red card!!!\n> ${event.player} (${event.time}) ${
            team.country
          }`
        )
        break
    }
  })
}

const processMatches = async () => {
  const matches = await getMatches()

  matches.forEach(match => {
    switch (match.status) {
      case 'future':
        processFutureMatch(match)
        break
      case 'in progress':
        processInProgressMatch(match)
        break
      case 'completed':
        processCompletedMatch(match)
        break
    }
  })

  return msgs
}

module.exports = processMatches
