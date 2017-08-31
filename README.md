# Sonar

![sonar logo](./images/sonar_108.png)

Information should be easily accessible and ubiquitous. Often data requires complex user experiences through limited devices. Instead, what if data can be conversational through commonly used communications tools like Facebook Messenger and Amazon Alexa voice recognition.

Sonar bot provides a natural language interface to local government open data and demographic services that helps people ask questions of their community.

This project is a prototype concept that is still evolving. It currently supports:

- Facebook messenger
- Slack
- Alexa Echo Skills

### Demo videos

- [DevSummit 2017 Plenary demo](https://youtu.be/H_cdn2kVB-E?t=4m35s)
- [Demo Theater including architecture](https://youtu.be/1J5y8sJ9aKI)

## Interface

### Example Commands

- /sonar map of 201 4th St NE, Washington, DC
- /sonar tell me about trash at 201 4th St NE, Washington, DC
- @sonar what are the bus stops at stanton park, Washington, DC
- Speak: safety of 201 4th St NE, Washington, DC
- Speak: Add note dangerous intersection at 2nd & constitution, Washington, DC
- /sonar see notes at 201 4th St NE, Washington, DC

### Slack

- `/sonar map of 708 10th St NE, Washington, DC`
- `/sonar tell me about trash at 708 10th St NE, Washington, DC`

### Facebook

- [Facebook @sonarhere](http://fb.me/sonarhere)
- [Messenger @sonarhere](http://m.me/sonarhere)

### Amazon Echo

- Help help {Dataset}
- Hello Hello Sonar.
- Hal Open the pod bay doors HAL.
- Ping ping {Dataset}
- GetPopulation give me the population of {Location}
- GetPopulation how many people live nearby {Location}
- GetPopulation what is the population of {Location}
- GetPopulation population {Location}
- GetPopulation people in {Location}
- GetCrime safety of {Location}
- GetData what is the {Dataset} of {Location}
- GetData what is the nearest {Dataset} at {Location}
- GetData tell me about {Dataset} at {Location}
- GetData ask about {Dataset} at {Location}
- GetData when is {Dataset} for {Location}
- SummarizeData how many {Dataset} at {Location} since {TimePeriod}
- SummarizeData in past {TimePeriod} how many {Dataset} at {Location}
- AddNote add note {Note} at {Location}
- GetMap map of {Location}
- GetMap see {Dataset} at {Location}
- ExitApp stop

## Develop

Sonar is built with [ClaudiaJS](https://claudiajs.com/) and hosted on Amazon Web Services.

To start developing, you will need to use an Amazon developer account.

### Quick Start

First run trhough the [Installing and Configuring Claudia.js](https://claudiajs.com/tutorials/installing.html) documentation, specifically the parts about installing Claudia globally (`npm install claudia -g`) and [Configuring Access Credentials](https://claudiajs.com/tutorials/installing.html#configuring-access-credentials). Then:

1. Clone this repo
1. `npm install`
1. Update your preferred AWS region in `package.json` and `claudia.json`
1. Create (first time): `npm run create`
1. Creating will deploy the appropriate API endpoints and lambda functions, but you must also then [configure](https://claudiajs.com/tutorials/hello-world-chatbot.html#connecting-with-facebook-messenger) the platforms you want. For example, 
    1. For Alexa: `claudia update --configure-alexa-skill`
    1. For Slack: `claudia update --configure-slack-slash-command`
    1. [etc](https://claudiajs.com/tutorials/hello-world-chatbot.html#connecting-with-facebook-messenger)
1. Updates: `npm run update` - will re-deploy your code to AWS.

### ArcGIS Token

To use the geoenrichment services for population, you will need to add an ArcGIS Token to the [Amazon API Gateway Stage Variables](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-set-stage-variables-aws-console.html)

1. Visit Amazon API Gateway
1. Within your API, click on "Stages"
1. Click on "latest"
1. Click on tab "Stage Variables"
1. Click on "Add Stage Variable"
1. In Name text input, enter `arcgisToken` and in Value text input enter your token
1. Click on the gray checkmark to the far right side


### Get Logs

Requires [AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html).

`npm run logs`

### Licensing

Copyright Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [LICENSE](./LICENSE) file.
