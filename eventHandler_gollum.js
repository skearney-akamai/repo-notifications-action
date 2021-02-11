const a = require('./eventAccessors.js');

const pageLink = (page, formatter) => formatter.format_link(page.html_url, page.page_name);
const calculatePageChange = (page, formatter) => `${pageLink(page, formatter)} was ${page.action}`;

const calculatePageChanges = (pages, formatter) => {
    const newPages = pages.map(val => calculatePageChange(val, formatter));
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

module.exports = (e, sf, mf) => {
    const pages = calculatePageChanges(e.pages, mf);
    let subject = `${sf.format_front(e, a)} created or modified one or more wiki pages`;
    let message = `${mf.format_front(e, a)} modified these pages: ${pages}`;

    return {
        subject: subject,
        message: message,
    };
};

