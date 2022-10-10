const a = require('./eventAccessors.js');

module.exports = (e, {subjectFormatter: sf, messageFormatter: mf, escaper: esc}) => {
    let subject = '';
    let message = '';

    switch(e.action) {
    case 'created':
        subject = `${sf.format_front(e, a)} created a new label: ${esc(e.label.name)}`;
        message = `${mf.format_front(e, a)} created a new label: ${esc(e.label.name)}.`;
        break;
    case 'edited':
        subject = `${sf.format_front(e, a)} changed the ${esc(e.label.name)} label`;
        message = `${mf.format_front(e, a)} changed the ${esc(e.label.name)} label.`;
        break;
    case 'deleted':
        subject = `${sf.format_front(e, a)} removed the ${esc(e.label.name)} label`;
        message = `${mf.format_front(e, a)} removed the ${esc(e.label.name)} label.`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
};
