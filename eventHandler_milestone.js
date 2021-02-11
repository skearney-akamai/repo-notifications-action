const a = require('./eventAccessors.js');

module.exports = (e, sf, mf) => {
    let subject = '';
    let message = '';

    switch(e.action) {
    case 'created':
        subject = `${sf.format_front(e, a)} created a new milestone: ${sf.format_link_simple(e.milestone.html_url, e.milestone.title)}`;
        message = `${mf.format_front(e, a)} created a new milestone: ${mf.format_link_simple(e.milestone.html_url, e.milestone.title)}`;
        break;
    case 'closed':
        subject = `${sf.format_front(e, a)} closed a milestone: ${sf.format_link_simple(e.milestone.html_url, e.milestone.title)}`;
        message = `${mf.format_front(e, a)} closed a milestone: ${mf.format_link_simple(e.milestone.html_url, e.milestone.title)}`;
        break;
    case 'opened':
        subject = `${sf.format_front(e, a)} opened a milestone: ${sf.format_link_simple(e.milestone.html_url, e.milestone.title)}`;
        message = `${mf.format_front(e, a)} opened a milestone: ${mf.format_link_simple(e.milestone.html_url, e.milestone.title)}`;
        break;
    case 'edited':
        subject = `${sf.format_front(e, a)} changed a milestone: ${sf.format_link_simple(e.milestone.html_url, e.milestone.title)}`;
        message = `${mf.format_front(e, a)} changed a milestone: ${mf.format_link_simple(e.milestone.html_url, e.milestone.title)}`;
        break;
    case 'deleted':
        subject = `${sf.format_front(e, a)} removed a milestone: ${sf.format_link_simple(e.milestone.html_url, e.milestone.title)}`;
        message = `${mf.format_front(e, a)} removed a milestone: ${mf.format_link_simple(e.milestone.html_url, e.milestone.title)}`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
};
