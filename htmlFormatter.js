
const formatter = {
    format_link: function(link, text) {
        return `<a href="${link}">${text}</a>`;
    },

    format_link_simple: function(link, text) {
        return this.format_link(link, text);
    },

    format_front: function(e, a) {
        return `[${this.format_link(a.repo_url(e), a.repo(e))}] ${this.format_link(a.sender_url(e), a.sender(e))}`;
    },

    format_issue: function(e, a) {
        const txt = `#${a.number(e)}`;
        return `${this.format_link(a.issue_url(e), txt)}: ${this.format_emphasis(a.title(e))}`;
    },

    format_emphasis: function(txt) {
        return `<i>${txt}</i>`;
    },
};

module.exports = formatter;
