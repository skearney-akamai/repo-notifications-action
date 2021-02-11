const a = require('./eventAccessors.js');

module.exports = (e, {subjectFormatter: sf, messageFormatter: mf}) => {
    let subject = `${sf.format_front(e, a)} forked the repository and created ${sf.format_link(e.forkee.html_url, e.forkee.full_name)}`;
    let message = `${mf.format_front(e, a)} forked the repository and created ${mf.format_link(e.forkee.html_url, e.forkee.full_name)}`;

    return {
        subject: subject,
        message: message,
    };
};

