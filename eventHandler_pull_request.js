const a = require('./eventAccessors.js');

function handler(e, sf, mf) {
    let subject = '';
    let message = '';

    switch(e.action) {
    case 'opened':
    case 'edited':
    case 'closed':
    case 'assigned':
    case 'unassigned':
    case 'review_requested':
    case 'review_request_removed':
    case 'ready_for_review':
    case 'converted_to_draft':
    case 'labeled':
    case 'unlabeled':
    case 'synchronize':
    case 'auto_merge_enabled':
    case 'auto_merge_disabled':
    case 'locked':
    case 'unlocked':
    case 'reopened':
        subject = `${sf.format_front(e, a)} ${e.action} this pull request: ${sf.format_link(e.pull_request.html_url, "#" + e.pull_request.number)}`;
        message = `${mf.format_front(e, a)} ${e.action} this pull request: ${mf.format_link(e.pull_request.html_url, "#" + e.pull_request.number)} - ${mf.format_emphasis(e.pull_request.title)}`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
}

module.exports = handler;
