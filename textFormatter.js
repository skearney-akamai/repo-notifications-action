
const formatter = {
    is: name => {
        const nm = name.toLowerCase();
        return nm === "text" ||
            nm === "txt";
    },

    nl: () => "\n",

    // This list formatter will start the list on the same line, so insert a newline before, if you need it
    format_list: entries => entries.map(e => ` - ${e}${formatter.nl()}\n`).join(''),
    
    format_link: (link, text) => {
        if (link === '') {
            return `${text}`;
        }

        if (text === '') {
            return `${link}`;
        }
            
        return `${text} (${link})`;
    },

    format_link_simple: (link, text) => {
        let out = text;
        if (out === '') {
            out = link;
        }
        return `${out}`;
    },

    format_front: (e, a) => `[${a.repo(e)}] ${a.sender(e)}`,
    format_issue: (e, a) => `#${a.number(e)}`,
    format_emphasis: txt => txt,

    format_number: (num, singular = '', plural = '') => {
        return `${num} ${num === 1 ? singular : plural}`.trim();
    },
};

module.exports = formatter;
