const timeFromNow = minutes => {
  const now = new Date()

  now.setSeconds(now.getSeconds() + minutes * 60)
  return now
}

const getMatches = async () => {
  return [
    {
      status: 'future',
      datetime: timeFromNow(1).toISOString(),
      home_team_country: 'Brazil',
      away_team_country: 'Switzerland'
    },
    {
      status: 'future',
      datetime: timeFromNow(5).toISOString(),
      home_team_country: 'Brazil',
      away_team_country: 'Croatia'
    },
    {
      status: 'completed',
      home_team: {
        country: 'Brazil',
        goals: 1
      },
      away_team: {
        country: 'Switzerland',
        goals: 1
      }
    },
    {
      status: 'in progress',
      home_team: {
        country: 'Brazil',
        goals: 1
      },
      away_team: {
        country: 'Switzerland',
        goals: 1
      },
      home_team_events: [
        {
          type_of_event: 'goal',
          player: 'Philippe Coutinho',
          time: "20'"
        }
      ],
      away_team_events: [
        {
          type_of_event: 'yellow-card',
          player: 'Valon Behrami',
          time: "68'"
        },
        {
          type_of_event: 'red-card',
          player: 'Fake Player',
          time: "90'"
        },
        {
          type_of_event: 'goal-penalty',
          player: 'Fake Player',
          time: "90'"
        }
      ]
    }
  ]
}

module.exports = { getMatches }
