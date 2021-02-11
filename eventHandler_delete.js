const a = require('./eventAccessors.js');

function handler(e) {
    let subject = '';
    let message = '';

    switch(e.ref_type) {
    case 'branch':
        subject = `${a.format_front(e)} deleted the '${e.ref}' branch`;
        message = `${a.format_front_html(e)} deleted the '${e.ref}' branch`;
        break;
    case 'tag':
        subject = `${a.format_front(e)} deleted the '${e.ref}' tag`;
        message = `${a.format_front_html(e)} deleted the '${e.ref}' tag`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
}

module.exports = handler;
