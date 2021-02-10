const core = require('@actions/core');

function handler(event) {
    core.info("Handling an 'issues' event");

    return {
        subject: '',
        message: '',
    };
}

module.exports = handler;
