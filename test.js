import fetch from "node-fetch";

import * as core from "@actions/core";
import * as github from "@actions/github";

if (github.context.eventName === "push") {
  const pushPayload = github.context.payload;
  core.info(`The head commit is: ${pushPayload.head_commit}`);
}

// Send the message to Slack via a webhook
const slackWebhookURL = process.env.SLACK_WEBHOOK_URL;
console.log(process.env.GHUB);
console.log(process.env);

// GITHUB_TRIGGERING_ACTOR
const processEnv = process.env;
let slackMessage = {
  text: ":lab_coat: Testing...",
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: JSON.stringify(processEnv),
      },
    },
  ],
};
console.log(slackMessage);
await fetch(slackWebhookURL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(slackMessage),
});
