
const formatter = {
    is: name => {
        const nm = name.toLowerCase();
        return nm === 'html' ||
            nm === 'htm';
    },
    nl: () => '<br/>',
    format_list: entries => `<ul>\n${entries.map(e => `  <li>${e}</li>\n`).join('')}</ul>\n`,

    format_link: (link, text) => {
        if (text === '') {
            return formatter.format_link(link, link);
        }
        return `<a href="${link}">${text}</a>`;
    },
    format_link_simple: (link, text) => formatter.format_link(link, text),
    format_front: (e, a) => `[${formatter.format_link(a.repo_url(e), a.repo(e))}] ${formatter.format_link(a.sender_url(e), a.sender(e))}`,
    format_issue: (e, a) => {
        const txt = `#${a.number(e)}`;
        return `${formatter.format_link(a.issue_url(e), txt)}: ${formatter.format_emphasis(a.title(e))}`;
    },
    format_emphasis: txt => `<i>${txt}</i>`,

    format_number: (num, singular = '', plural = '') => {
        return `<b>${num}</b> ${num === 1 ? singular : plural}`.trim();
    },
};

module.exports = formatter;
