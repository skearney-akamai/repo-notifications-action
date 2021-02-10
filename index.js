const core = require('@actions/core');

async function run() {
  try {
      const eventS = core.getInput('event');
      const event = JSON.parse(eventS);

      core.info(eventS);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

