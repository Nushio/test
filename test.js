const fetch = require("node-fetch");
const github = require("@actions/github");

// Send the message to Slack via a webhook
const slackWebhookURL = process.env.SLACK_WEBHOOK_URL;

const triggeredBy = process.env.GITHUB_TRIGGERING_ACTOR;
const title = process.env.TITLE;
const lastCommitMessage = github.context.payload.head_commit.message;
const githubLogsURL = `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}/`;
const successMessage = `:tada: ${title} was succesfully deployed!`;
const failureMessage = `:exclamation: ${title} failed to deploy. Don't Panic! Check the logs for more details.`;
let slackMessage = {
  text: `${
    process.env.JOBSTATUS === "success" ? ":tada:" : ":exclamation:"
  } ${title}`,
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${
          process.env.JOBSTATUS === "success" ? successMessage : failureMessage
        }.\n\n:point_right: Triggered by: ${triggeredBy}\n:clipboard: Last commit message: ${lastCommitMessage}\n\n:github: Github Build Logs: ${githubLogsURL}\n\n${
          process.env.JOBSTATUS === "failure"
            ? "Pinging <@U029HJM1JV9> so he can take a look."
            : ""
        }`,
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
