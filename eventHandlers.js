const core = require('@actions/core');

function handlerFor(name) {
    core.info("testing testing");
    return null;
}

module.exports = {handlerFor: handlerFor};
