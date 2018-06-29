### WorldCup Bot

Meet WorldCup Bot, a dirty simple bot for posting to Slack 2018 FIFA World Cup Russia™ matches events.

WorldCup Bot will post:

* Today's matches
* Matches about to start
* Goals
* Yellow and red cards

![](preview.png)

### Getting started

Install Serverless `npm install serverless -g`.

Configure your [AWS keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html), [this article](https://serverless.com/framework/docs/providers/aws/guide/credentials/) shows various ways of configuring the keys. A quick dirty one is just to export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. Personally, I prefer [aws-vault](https://github.com/99designs/aws-vault) for managing my keys.

Get a [Slack Token](https://api.slack.com/custom-integrations/legacy-tokens).

Create a `.env` as follows:

```
SLACK_TOKEN=YOUR-SLACK-TOKEN
SLACK_CHANNEL=#worldcup
SLACK_BOT_NAME=WorldCup Bot
```

Deploy:

```sh
serverless deploy
```

### Resources

WorldCup Bot runs on [AWS](https://aws.amazon.com/) and it uses:

* [Serverless](https://serverless.com) for provisioning the stack ([CloudFormation](https://aws.amazon.com/cloudformation/))
* [Lambda](https://aws.amazon.com/lambda/) for processing matches data from [WORLD CUP 2018](https://worldcup.sfg.io/) and posting to Slack
* [CloudWatch Events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html) for triggering the Lambda every 1 minute
* [DynamoDB](https://aws.amazon.com/dynamodb/) for keeping track of the sent messages to avoid duplicates

### Uninstall

Once you are done with your bot, you can just remove the CloudFormation stack `serverless remove`.
