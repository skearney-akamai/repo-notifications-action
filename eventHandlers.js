
const allHandlers = {
    // check_run: 
    // check_suite
    // create
    // delete
    // deployment
    // deployment_status
    // fork
    // gollum
    // issue_comment
    issues: require('./eventHandler_issues.js'),
    // label
    // milestone
    // page_build
    // project
    // project_card
    // project_column
    // public
    // pull_request
    // pull_request_review
    // pull_request_review_comment
    // pull_request_target
    // push
    // registry_package
    // release
    // status
    // watch    
};

function handlerFor(name) {
    return allHandlers[name];
}

module.exports = {handlerFor: handlerFor};
