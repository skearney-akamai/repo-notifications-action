
const accessors = {
    repository_name: function(e) {
        return e.repository.full_name;
    },

    repo: function(e) {
        return this.repository_name(e);
    },

    sender_name: function(e) {
        return e.sender.login;
    },

    sender: function(e) {
        return this.sender_name(e);
    },

    number: function(e) {
        return e.issue.number;
    },

    title: function(e) {
        return e.issue.title;
    },
    
    repo_url: function(e) {
        return e.repository.html_url;
    }, 

    sender_url: function(e) {
        return e.sender.html_url;
    }, 

    issue_url: function(e) {
        return e.issue.html_url;
    }, 

    assignee: function(e) {
        return e.assignee.login;
    },

    assignee_url: function(e) {
        return e.assignee.html_url;
    },

    comment_url: function(e) {
        return e.comment.html_url;
    },
    
    format_front: function(e) {
        return `[${this.repo(e)}] ${this.sender(e)}`;
    },

    format_front_html: function(e) {
        return `[<a href="${this.repo_url(e)}">${this.repo(e)}</a>] <a href="${this.sender_url(e)}">${this.sender(e)}</a>`;
    },

    format_issue: function(e) {
        return `#${this.number(e)}`;
    },

    format_issue_html: function(e) {
        return `<a href="${this.issue_url(e)}">#${this.number(e)}</a>: <i>${this.title(e)}</i>`;
    },
};

module.exports = accessors;
