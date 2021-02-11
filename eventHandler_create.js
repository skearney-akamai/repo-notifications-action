const a = require('./eventAccessors.js');

module.exports = (e, sf, mf) => {
    let subject = '';
    let message = '';

    switch(e.ref_type) {
    case 'branch':
        subject = `${sf.format_front(e, a)} created a new branch: '${e.ref}'`;
        message = `${mf.format_front(e, a)} created a new branch: '${e.ref}'`;
        break;
    case 'tag':
        subject = `${sf.format_front(e, a)} created a new tag: '${e.ref}'`;
        message = `${mf.format_front(e, a)} created a new tag: '${e.ref}'`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
};

