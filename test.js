import fetch from "node-fetch";

// Send the message to Slack via a webhook
const slackWebhookURL = process.env.SLACK_WEBHOOK_URL;

const jobstatus = process.env.JOBSTATUS;
const triggeredBy = process.env.GITHUB_TRIGGERING_ACTOR;
const title = process.env.TITLE;
const lastCommitMessage = process.env.LAST_COMMIT_MESSAGE;
const githubLogsURL = `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}/`;
let slackMessage = {
  text: `${title}`,
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Hi everyone! I'm here to let you know that the job \`${title}\` has finished with status \`${jobstatus}\`.\n\nTriggered by: ${triggeredBy}\nLast commit message: ${lastCommitMessage}\n\nLogs: ${githubLogsURL}`,
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
