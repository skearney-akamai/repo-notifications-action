
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
};

module.exports = accessors;
