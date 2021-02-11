
const allHandlers = {
    // check_run - LATER
    // check_suite - LATER
    // deployment - LATER
    // deployment_status - LATER
    // page_build - LATER
    // project - project updates - LATER
    // project_card - project updates - LATER
    // project_column - project updates - LATER
    // public - LATER
    // pull_request_review - LATER
    // pull_request_review_comment - LATER
    // pull_request_target - LATER
    // registry_package - LATER
    // release - LATER
    // watch - LATER  

    // fork - someone created a fork of our project
    // gollum - when someone changed a wiki page
    // label - when a label was created or modified
    // milestone - when a milestone was modified in some way
    // pull_request - someone created a pull request for the project
    // push - when commits are pushed
    // status - keeps track of the status of a specific commit
    
    create: require('./eventHandler_create.js'),
    delete: require('./eventHandler_delete.js'),
    issue_comment: require('./eventHandler_issue_comment.js'),
    issues: require('./eventHandler_issues.js'),
};

function handlerFor(name) {
    return allHandlers[name];
}

module.exports = {handlerFor: handlerFor};
