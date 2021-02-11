
const formatter = {
    format_link: function(link, text) {
        return `${text} (${link})`;
    },

    format_link_simple: function(link, text) {
        let out = text;
        if (out === '') {
            out = link;
        }
        return `${out}`;
    },

    format_front: function(e, a) {
        return `[${a.repo(e)}] ${a.sender(e)}`;
    },

    format_issue: function(e, a) {
        return `#${this.number(e)}`;
    },

    format_emphasis: function(txt) {
        return txt;
    },
};

module.exports = formatter;
