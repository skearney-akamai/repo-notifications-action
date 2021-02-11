const a = require('./eventAccessors.js');

module.exports = (e, {subjectFormatter: sf, messageFormatter: mf}) => {
    let subject = '';
    let message = '';

    switch(e.action) {
    case 'created':
        subject = `${sf.format_front(e, a)} created a new comment on issue ${sf.format_issue(e, a)}`;
        message = `${mf.format_front(e, a)} created a new ${mf.format_link(a.comment_url(e), 'comment')} on issue ${mf.format_issue(e, a)}`;
        break;
    case 'edited':
        subject = `${sf.format_front(e, a)} changed a comment on issue ${sf.format_issue(e, a)}`;
        message = `${mf.format_front(e, a)} changed a ${mf.format_link(a.comment_url(e), 'comment')} on issue ${mf.format_issue(e, a)}`;
        break;
    case 'deleted':
        subject = `${sf.format_front(e, a)} removed a comment on issue ${sf.format_issue(e, a)}`;
        message = `${mf.format_front(e, a)} removed a ${mf.format_link(a.comment_url(e), 'comment')} on issue ${mf.format_issue(e, a)}`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
};

