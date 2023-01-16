import fetch from "node-fetch";

// Send the message to Slack via a webhook
const slackWebhookURL = process.env.SLACK_WEBHOOK_URL;
console.log(process.env);
const processEnv = processEnv;
let slackMessage = {
  text: ":lab_coat: Testing...",
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${processEnv}`,
      },
    },
  ],
};
await fetch(slackWebhookURL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(slackMessage),
});
