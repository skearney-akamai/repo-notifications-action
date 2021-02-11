
const formatter = {
    is: name => {
        const nm = name.toLowerCase();
        return nm === "text" ||
            nm === "txt";
    },

    nl: () => "\n",

    format_list: entries => {
        // I think we will simply make this into a list with dashes
    },
    
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
};

module.exports = formatter;
