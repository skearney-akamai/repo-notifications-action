const core = require('@actions/core');

function format_user(user) {
    return user;
}

function format_repository(repo) {
    return repo;
}

function repository_name(e) {
    return e.repository.name;
}

function repo(e) {
    return format_repository(repository_name(e));
}

function sender_name(e) {
    return e.sender.login;
}

function sender(e) {
    return format_user(sender_name(e));
}

function number(e) {
    return e.issue.number;
}

function title(e) {
    return e.issue.title;
}

function isOpened(e) {
    return e.action === 'opened';
}

function isClosed(e) {
    return e.action === 'closed';
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

function handler(e) {
    if (isOpened(e) || isClosed(e)) {
        const subject = `[${repo(e)}] ${sender(e)} ${e.action} issue #${number(e)}`;
        const message = `[<a href="${repo_url(e)}">${repo(e)}</a>] <a href="${sender_url(e)}">${sender(e)}</a> ${e.action} issue <a href="${issue_url(e)}">#${number(e)}</a>: <i>${title(e)}</i>`;
        return {
            subject: subject,
            message: message,
        };
    }

    return {
        subject: '',
        message: '',
    };
}

module.exports = handler;
