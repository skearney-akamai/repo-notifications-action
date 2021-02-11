const a = require('./eventAccessors.js');

module.exports = (e, {subjectFormatter: sf, messageFormatter: mf}) => {
    let subject = '';
    let message = '';

    switch(e.state) {
    case 'pending':
        subject = `${sf.format_front(e, a)} triggered a change in status - the repository is currently pending`;
        message = `${mf.format_front(e, a)} triggered a change in status - the repository is currently pending`;
        break;
    case 'success':
        subject = `${sf.format_front(e, a)} triggered a change in status - the current status is success`;
        message = `${mf.format_front(e, a)} triggered a change in status - the current status is success`;
        break;
    case 'failure':
        subject = `${sf.format_front(e, a)} triggered a change in status - the repository is now failing`;
        message = `${mf.format_front(e, a)} triggered a change in status - the repository is now failing`;
        break;
    case 'error':
        subject = `${sf.format_front(e, a)} triggered a change in status - the repository is now erroring`;
        message = `${mf.format_front(e, a)} triggered a change in status - the repository is now erroring`;
        break;
    }

    return {
        subject: subject,
        message: message,
    };
};
