const a = require('./eventAccessors.js');

function pageLink(page, formatter) {
    return formatter.format_link(page.html_url, page.page_name);
}

function calculatePageChange(page, formatter) {
    return `${pageLink(page, formatter)} was ${page.action}`;
}
    
function calculatePageChanges(pages, formatter) {
    const newPages = pages.map(function(val) { return calculatePageChange(val, formatter); });
    if (newPages.length < 2) {
        return newPages[0] || 'no pages updated';
    }
    let result = '';
    const len = newPages.length;
    newPages.forEach(function(page, ix) {
        if (ix === len-1) {
            result = `${result} and ${page}`;
        } else {
            result = `${result}, ${page}`;
        }
    });

    return result;
}

function handler(e, sf, mf) {
    const pages = calculatePageChanges(e.pages, mf);
    let subject = `${sf.format_front(e, a)} created or modified one or more wiki pages`;
    let message = `${mf.format_front(e, a)} modified these pages: ${pages}`;

    return {
        subject: subject,
        message: message,
    };
}

module.exports = handler;
