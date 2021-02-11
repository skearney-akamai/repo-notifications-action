const a = require('./eventAccessors.js');

module.exports = (e, {subjectFormatter: sf, messageFormatter: mf, escaper: esc}) => {
    let subject = '';
    let message = '';

    switch(e.ref_type) {
    case 'branch':
        subject = `${sf.format_front(e, a)} created a new branch: '${esc(e.ref)}'`;
        message = `${mf.format_front(e, a)} created a new branch: '${esc(e.ref)}'`;
        break;
    case 'tag':
        subject = `${sf.format_front(e, a)} created a new tag: '${esc(e.ref)}'`;
        message = `${mf.format_front(e, a)} created a new tag: '${esc(e.ref)}'`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
};

