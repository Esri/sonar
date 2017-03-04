# Sonar

Chat bot to learn about local services and data.

![sonar logo](./sonar.png)

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

- GetPopulation give me the population of {Location}
- GetPopulation how many people live nearby {Location}
- GetPopulation what is the population of {Location}
- GetPopulation population {Location}
- GetPopulation people in {Location}
- GetCrime safety of {Location}
- GetData what is the {Dataset} of {Location}
- GetData when is {Dataset} for {Location}
- SummarizeData how many {Dataset} at {Location} since {TimePeriod}
- SummarizeData in past {TimePeriod} how many {Dataset} at {Location}
- AddNote note at {Location} {Note}
- GetMap map of {Location}
- GetMap show map of {Location}
- ExitApp stop

## Develop

### Update Amazon Lambda functions

`claudia create --region us-east-1 --api-module bot`

`claudia update`

### Get Logs

`aws logs filter-log-events --log-group-name /aws/lambda/claudia-test`
