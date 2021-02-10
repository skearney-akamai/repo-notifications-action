const core = require('@actions/core');

function repository_name(e) {
    return e.repository.full_name;
}

function repo(e) {
    return repository_name(e);
}

function sender_name(e) {
    return e.sender.login;
}

function sender(e) {
    return sender_name(e);
}

function number(e) {
    return e.issue.number;
}

function title(e) {
    return e.issue.title;
}

function repo_url(e) {
    return e.repository.html_url;
}

function sender_url(e) {
    return e.sender.html_url;
}

function issue_url(e) {
    return e.issue.html_url;
}

function assignee(e) {
    return e.assignee.login;
}

function assignee_url(e) {
    return e.assignee.html_url;
}

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
        subject = `[${repo(e)}] ${sender(e)} ${e.action} issue #${number(e)}`;
        message = `[<a href="${repo_url(e)}">${repo(e)}</a>] <a href="${sender_url(e)}">${sender(e)}</a> ${e.action} issue <a href="${issue_url(e)}">#${number(e)}</a>: <i>${title(e)}</i>`;
        break;
    case 'assigned':
    case 'unassigned':
        let referent = 'to';
        if (e.action === 'unassigned') {
            referent = 'from';
        }

        subject = `[${repo(e)}] ${sender(e)} ${e.action} ${assignee(e)} ${referent} issue #${number(e)}`;
        message = `[<a href="${repo_url(e)}">${repo(e)}</a>] <a href="${sender_url(e)}">${sender(e)}</a> ${e.action} <a href="${assignee_url(e)}">${assignee(e)}</a> ${referent} <a href="${issue_url(e)}">#${number(e)}</a>: <i>${title(e)}</i>`;
        break;
    case 'labeled':
        subject = `[${repo(e)}] ${sender(e)} added the label '${e.label.name}' to issue #${number(e)}`;
        message = `[<a href="${repo_url(e)}">${repo(e)}</a>] <a href="${sender_url(e)}">${sender(e)}</a> added the label '${e.label.name}' to <a href="${issue_url(e)}">#${number(e)}</a>: <i>${title(e)}</i>`;
        break;
    case 'unlabeled':
        subject = `[${repo(e)}] ${sender(e)} remove the label '${e.label.name}' from issue #${number(e)}`;
        message = `[<a href="${repo_url(e)}">${repo(e)}</a>] <a href="${sender_url(e)}">${sender(e)}</a> remove the label '${e.label.name}' from <a href="${issue_url(e)}">#${number(e)}</a>: <i>${title(e)}</i>`;
        break;
    case 'milestoned':
        subject = `[${repo(e)}] ${sender(e)} set the milestone for issue #${number(e)} to '${e.milestone.title}'`;
        message = `[<a href="${repo_url(e)}">${repo(e)}</a>] <a href="${sender_url(e)}">${sender(e)}</a> set the milestone for issue <a href="${issue_url(e)}">#${number(e)}</a>: <i>${title(e)}</i> to '<a href="${e.milestone.html_url}">${e.milestone.title}</a>'`;
        break;
    case 'demilestoned':
        subject = `[${repo(e)}] ${sender(e)} removed the milestone '${e.milestone.title}' from issue #${number(e)}`;
        message = `[<a href="${repo_url(e)}">${repo(e)}</a>] <a href="${sender_url(e)}">${sender(e)}</a> removed the milestone '<a href="${e.milestone.html_url}">${e.milestone.title}</a>' from issue <a href="${issue_url(e)}">#${number(e)}</a>: <i>${title(e)}</i>`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
}

module.exports = handler;
