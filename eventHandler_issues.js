const a = require('./eventAccessors.js');

function handler(e) {
    let subject = '';
    let message = '';
    
    switch(e.action) {
    case 'opened':
    case 'reopened':
    case 'closed':
    case 'edited':
    case 'deleted':
    case 'locked':
    case 'unlocked':
    case 'pinned':
    case 'unpinned':
    case 'transferred':
        subject = `${a.format_front(e)} ${e.action} issue ${a.format_issue(e)}`;
        message = `${a.format_front_html(e)} ${e.action} issue ${a.format_issue_html(e)}`;
        break;
    case 'assigned':
    case 'unassigned':
        let referent = 'to';
        if (e.action === 'unassigned') {
            referent = 'from';
        }

        subject = `${a.format_front(e)} ${e.action} ${a.assignee(e)} ${referent} issue ${a.format_issue(e)}`;
        message = `${a.format_front_html(e)} ${e.action} <a href="${a.assignee_url(e)}">${a.assignee(e)}</a> ${referent} issue ${a.format_issue_html(e)}`;
        break;
    case 'labeled':
        subject = `${a.format_front(e)} added the label '${e.label.name}' to issue ${a.format_issue(e)}`;
        message = `${a.format_front_html(e)} added the label '${e.label.name}' to issue ${a.format_issue_html(e)}`;
        break;
    case 'unlabeled':
        subject = `${a.format_front(e)} removed the label '${e.label.name}' from issue ${a.format_issue(e)}`;
        message = `${a.format_front_html(e)} remove the label '${e.label.name}' from issue ${a.format_issue_html(e)}`;
        break;
    case 'milestoned':
        subject = `${a.format_front(e)} set the milestone for issue ${a.format_issue(e)} to '${e.milestone.title}'`;
        message = `${a.format_front_html(e)} set the milestone for issue ${a.format_issue_html(e)} to '<a href="${e.milestone.html_url}">${e.milestone.title}</a>'`;
        break;
    case 'demilestoned':
        subject = `${a.format_front(e)} removed the milestone '${e.milestone.title}' from issue ${a.format_issue(e)}`;
        message = `${a.format_front_html(e)} removed the milestone '<a href="${e.milestone.html_url}">${e.milestone.title}</a>' from issue ${a.format_issue_html(e)}`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
}

module.exports = handler;
