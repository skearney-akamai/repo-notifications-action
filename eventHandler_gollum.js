const a = require('./eventAccessors.js');

const pageLink = (page, formatter, esc) => formatter.format_link(page.html_url, esc(page.page_name));
const calculatePageChange = (page, formatter, esc) => `${pageLink(page, formatter, esc)} was ${page.action}`;

const calculatePageChanges = (pages, formatter, esc) => {
    const newPages = pages.map(val => calculatePageChange(val, formatter, esc));
    if (newPages.length < 2) {
        return newPages[0] || 'no pages updated';
    }
    let result = '';
    const len = newPages.length;
    newPages.forEach((page, ix) => {
        if (ix === len-1) {
            result = `${result} and ${page}`;
        } else {
            result = `${result}, ${page}`;
        }
    });

    return result;
};

module.exports = (e, {subjectFormatter: sf, messageFormatter: mf, escaper: esc}) => {
    const pages = calculatePageChanges(e.pages, mf, esc);
    let subject = `${sf.format_front(e, a)} created or modified one or more files`;
    let message = `${mf.format_front(e, a)} modified these files: ${pages}.`;

    return {
        subject: subject,
        message: message,
    };
};

