
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
    
    create: require('./eventHandler_create.js'),
    delete: require('./eventHandler_delete.js'),
    fork: require('./eventHandler_fork.js'),
    gollum: require('./eventHandler_gollum.js'),
    issue_comment: require('./eventHandler_issue_comment.js'),
    issues: require('./eventHandler_issues.js'),
    label: require('./eventHandler_label.js'),
    milestone: require('./eventHandler_milestone.js'),
    pull_request: require('./eventHandler_pull_request.js'),
    push: require('./eventHandler_push.js'),
    status: require('./eventHandler_status.js'),
};

module.exports = {handlerFor: name => allHandlers[name]};
