const a = require('./eventAccessors.js');

module.exports = (e, {subjectFormatter: sf, messageFormatter: mf}) => {
    let subject = '';
    let message = '';

    switch(e.action) {
    case 'opened':
    subject = `${sf.format_front(e, a)} opened an issue ${sf.format_issue(e, a)}`;
    message = `${mf.format_front(e, a)} opened an issue ${mf.format_issue(e, a)}. nl nl '${e.issue.body}'.`;
    break;
    case 'reopened':
    case 'closed':
    case 'edited':
    case 'deleted':
    case 'locked':
    case 'unlocked':
    case 'pinned':
    case 'unpinned':
    case 'transferred':
        subject = `${sf.format_front(e, a)} ${e.action} issue ${sf.format_issue(e, a)}`;
        message = `${mf.format_front(e, a)} ${e.action} issue ${mf.format_issue(e, a)}.`;
        break;
    case 'assigned':
    case 'unassigned':
        let referent = 'to';
        if (e.action === 'unassigned') {
            referent = 'from';
        }

        subject = `${sf.format_front(e, a)} ${e.action} ${sf.format_link_simple(a.assignee_url(e), a.assignee(e))} ${referent} issue ${sf.format_issue(e, a)}`;
        message = `${mf.format_front(e, a)} ${e.action} ${mf.format_link_simple(a.assignee_url(e), a.assignee(e))} ${referent} issue ${mf.format_issue(e, a)}.`;
        break;
    case 'labeled':
        subject = `${sf.format_front(e, a)} added the label '${e.label.name}' to issue ${sf.format_issue(e, a)}`;
        message = `${mf.format_front(e, a)} added the label '${e.label.name}' to issue ${mf.format_issue(e, a)}.`;
        break;
    case 'unlabeled':
        subject = `${sf.format_front(e, a)} removed the label '${e.label.name}' from issue ${sf.format_issue(e, a)}`;
        message = `${mf.format_front(e, a)} removed the label '${e.label.name}' from issue ${mf.format_issue(e, a)}.`;
        break;
    case 'milestoned':
        subject = `${sf.format_front(e, a)} set the milestone for issue ${sf.format_issue(e, a)} to '${sf.format_link_simple(e.milestone.html_url, e.milestone.title)}'`;
        message = `${mf.format_front(e, a)} set the milestone for issue ${mf.format_issue(e, a)} to '${mf.format_link_simple(e.milestone.html_url, e.milestone.title)}'.`;
        break;
    case 'demilestoned':
        subject = `${sf.format_front(e, a)} removed the milestone '${sf.format_link_simple(e.milestone.html_url, e.milestone.title)}' from issue ${sf.format_issue(e, a)}`;
        message = `${mf.format_front(e, a)} removed the milestone '${mf.format_link_simple(e.milestone.html_url, e.milestone.title)}' from issue ${mf.format_issue(e, a)}.`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
};

