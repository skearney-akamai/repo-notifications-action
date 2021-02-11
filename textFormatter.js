
const formatter = {
    format_link: function(link, text) {
        if (link === '') {
            return `${text}`;
        }

        if (text === '') {
            return `${link}`;
        }
            
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
        return `#${a.number(e)}`;
    },

    format_emphasis: function(txt) {
        return txt;
    },
};

module.exports = formatter;
