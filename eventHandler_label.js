const a = require('./eventAccessors.js');

function handler(e, sf, mf) {
    let subject = '';
    let message = '';

    switch(e.action) {
    case 'created':
        subject = `${sf.format_front(e, a)} created a new label: ${e.label.name}`;
        message = `${mf.format_front(e, a)} created a new label: ${e.label.name}`;
        break;
    case 'edited':
        subject = `${sf.format_front(e, a)} changed the ${e.label.name} label`;
        message = `${mf.format_front(e, a)} changed the ${e.label.name} label`;
        break;
    case 'deleted':
        subject = `${sf.format_front(e, a)} removed the ${e.label.name} label`;
        message = `${mf.format_front(e, a)} removed the ${e.label.name} label`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
}

module.exports = handler;
