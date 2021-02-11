const a = require('./eventAccessors.js');

function handler(e) {
    let subject = '';
    let message = '';

    switch(e.ref_type) {
    case 'branch':
        subject = `${a.format_front(e)} created a new branch: '${e.ref}'`;
        message = `${a.format_front_html(e)} created a new branch: '${e.ref}'`;
        break;
    case 'tag':
        subject = `${a.format_front(e)} created a new tag: '${e.ref}'`;
        message = `${a.format_front_html(e)} created a new tag: '${e.ref}'`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
}

module.exports = handler;
