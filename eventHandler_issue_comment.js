const a = require('./eventAccessors.js');

function handler(e) {
    let subject = '';
    let message = '';

    switch(e.action) {
    case 'created':
        subject = `${a.format_front(e)} created a new comment on issue ${a.format_issue(e)}`;
        message = `${a.format_front_html(e)} created a new <a href="${a.comment_url(e)}">comment</a> on issue ${a.format_issue_html(e)}`;
        break;
    case 'edited':
        subject = `${a.format_front(e)} changed a comment on issue ${a.format_issue(e)}`;
        message = `${a.format_front_html(e)} changed a <a href="${a.comment_url(e)}">comment</a> on issue ${a.format_issue_html(e)}`;
        break;
    case 'deleted':
        subject = `${a.format_front(e)} removed a comment on issue ${a.format_issue(e)}`;
        message = `${a.format_front_html(e)} removed a <a href="${a.comment_url(e)}">comment</a> on issue ${a.format_issue_html(e)}`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
}

module.exports = handler;
