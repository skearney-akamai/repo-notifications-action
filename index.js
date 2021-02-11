const core = require('@actions/core');
const eh = require('./eventHandlers.js');

const textFormat = require('./textFormatter.js');
const htmlFormat = require('./htmlFormatter.js');

// const printEnv = name => {
//     core.info(`${name}: ${process.env[name]}`);
// };

const run = async () => {
  try {
      const eventS = core.getInput('event');
      const event = JSON.parse(eventS);

      // core.info(eventS);

      // printEnv('CI');
      // printEnv('GITHUB_WORKFLOW');
      // printEnv('GITHUB_RUN_ID');
      // printEnv('GITHUB_RUN_NUMBER');
      // printEnv('GITHUB_ACTION');
      // printEnv('GITHUB_ACTIONS');
      // printEnv('GITHUB_ACTOR');
      // printEnv('GITHUB_REPOSITORY');
      // printEnv('GITHUB_EVENT_NAME');
      // printEnv('GITHUB_EVENT_PATH');
      // printEnv('GITHUB_WORKSPACE');
      // printEnv('GITHUB_SHA');
      // printEnv('GITHUB_REF');
      // printEnv('GITHUB_HEAD_REF');
      // printEnv('GITHUB_BASE_REF');
      // printEnv('GITHUB_SERVER_URL');
      // printEnv('GITHUB_API_URL');
      // printEnv('GITHUB_GRAPHQL_URL');

      const handler = eh.handlerFor(process.env.GITHUB_EVENT_NAME);
      if (handler) {
          // The first formatter is for the subject, and the second is for the message
          const result = handler(event, textFormat, htmlFormat);
          core.info(result.subject);
          core.info(result.message);
          core.setOutput('subject', result.subject);
          core.setOutput('message', result.message);
      } else {
          core.warning(`No event handler configured for '${process.env.GITHUB_EVENT_NAME}'`);
          core.setOutput('subject', '');
          core.setOutput('message', '');
      }
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
