const a = require('./eventAccessors.js');

module.exports = (e, {subjectFormatter: sf, messageFormatter: mf, escaper: esc}) => {
    let subject = '';
    let message = '';

    switch(e.ref_type) {
    case 'branch':
        subject = `${sf.format_front(e, a)} deleted the '${esc(e.ref)}' branch`;
        message = `${mf.format_front(e, a)} deleted the '${esc(e.ref)}' branch`;
        break;
    case 'tag':
        subject = `${sf.format_front(e, a)} deleted the '${esc(e.ref)}' tag`;
        message = `${mf.format_front(e, a)} deleted the '${esc(e.ref)}' tag`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
};
