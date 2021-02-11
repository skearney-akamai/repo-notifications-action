const a = require('./eventAccessors.js');

function handler(e, sf, mf) {
    let subject = '';
    let message = '';

    switch(e.ref_type) {
    case 'branch':
        subject = `${sf.format_front(e, a)} deleted the '${e.ref}' branch`;
        message = `${mf.format_front(e, a)} deleted the '${e.ref}' branch`;
        break;
    case 'tag':
        subject = `${sf.format_front(e, a)} deleted the '${e.ref}' tag`;
        message = `${mf.format_front(e, a)} deleted the '${e.ref}' tag`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
}

module.exports = handler;
