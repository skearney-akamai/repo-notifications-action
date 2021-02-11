
const formatter = {
    is: name => {
        const nm = name.toLowerCase();
        return nm === 'html' ||
            nm === 'htm';
    },
    nl: () => '<br/>',
    format_list: entries => {
        // we will use <ul> and <li> here
    },
    format_link: (link, text) => {
        if (text === '') {
            return this.format_link(link, link);
        }
        return `<a href="${link}">${text}</a>`;
    },
    format_link_simple: (link, text) => this.format_link(link, text),
    format_front: (e, a) => `[${this.format_link(a.repo_url(e), a.repo(e))}] ${this.format_link(a.sender_url(e), a.sender(e))}`,
    format_issue: (e, a) => {
        const txt = `#${a.number(e)}`;
        return `${this.format_link(a.issue_url(e), txt)}: ${this.format_emphasis(a.title(e))}`;
    },
    format_emphasis: txt => `<i>${txt}</i>`,
};

module.exports = formatter;
