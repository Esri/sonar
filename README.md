# Dreses

Chat bot for connecting to ArcGIS services.

Current supports the following thanks to ClaudiaJS:

- Facebook messenger
- Slack
- Alexa Echo Skills

## About Dreses

Abu Abdullah Muhammad al-Idrisi al-Qurtubi al-Hasani as-Sabti, or simply Al-Idrisi, was an extensive traveler and geographer of the 12th Century. One of his most famous writings was _"Kitab nuzhat al-mushtaq" (A Diversion for the Man Longing to Travel to Far-Off Places)_.

Al-Idrisi was commonly known simply as *Dreses*.

## Interface

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

## Create & Update

`claudia create --region us-east-1 --api-module bot`

`claudia update`

## Get Logs

`aws logs filter-log-events --log-group-name /aws/lambda/claudia-test`
