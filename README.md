# Sonar

Chat bot to learn about local services and data.

![sonar logo](./images/sonar_108.png)

Powered by connecting to open data geoservices. Currently supports:

- Facebook messenger
- Slack
- Alexa Echo Skills

## Interface

### Slack

- `/sonar what is Crime for 101 Main St, Denver, CO`

### Facebook

- [Facebook @sonarhere](http://fb.me/sonarhere)
- [Messenger @sonarhere](http://m.me/sonarhere)

### Amazon Echo

Help help {Dataset}
Hello Hello Sonar.
Hal Open the pod bay doors HAL.
Ping ping {Dataset}
GetPopulation give me the population of {Location}
GetPopulation how many people live nearby {Location}
GetPopulation what is the population of {Location}
GetPopulation population {Location}
GetPopulation people in {Location}
GetCrime safety of {Location}
GetData what is the {Dataset} of {Location}
GetData tell me about {Dataset} at {Location}
GetData ask about {Dataset} at {Location}
GetData when is {Dataset} for {Location}
SummarizeData how many {Dataset} at {Location} since {TimePeriod}
SummarizeData in past {TimePeriod} how many {Dataset} at {Location}
AddNote add note {Note} at {Location}
GetMap map of {Location}
GetMap show map of {Location}
ExitApp stop

## Develop

### Update Amazon Lambda functions

`claudia create --region us-east-1 --api-module bot`

`claudia update`

### Get Logs

`aws logs filter-log-events --log-group-name /aws/lambda/claudia-test`

## TODO

1. Add `ping/pong`
1. Add `poll`
1. Add `checkin`
1. Add 'HAL Joke'
  - "It can only be attributable to human error."
  Dave Bowman: Hello, HAL. Do you read me, HAL?
  HAL: Affirmative, Dave. I read you.
  Dave Bowman: Open the pod bay doors, HAL.
  HAL: I'm sorry, Dave. I'm afraid I can't do that.
  Dave Bowman: What's the problem?
  HAL: I think you know what the problem is just as well as I do.
  Dave Bowman: What are you talking about, HAL?
  HAL: This mission is too important for me to allow you to jeopardize it.
  Dave Bowman: I don't know what you're talking about, HAL.
  HAL: I know that you and Frank were planning to disconnect me, and I'm afraid that's something I cannot allow to happen.
  Dave Bowman: [feigning ignorance] Where the hell did you get that idea, HAL?
  HAL: Dave, although you took very thorough precautions in the pod against my hearing you, I could see your lips move.
  Dave Bowman: Alright, HAL. I'll go in through the emergency airlock.
  HAL: Without your space helmet, Dave? You're going to find that rather difficult.
  Dave Bowman: HAL, I won't argue with you anymore! Open the doors!
  HAL: Dave, this conversation can serve no purpose anymore. Goodbye.
