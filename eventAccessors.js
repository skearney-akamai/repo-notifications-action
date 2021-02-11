
const accessors = {
    repository_short_name: e => e.repository.name,
    repository_name: e => e.repository.full_name,
    repo: e => accessors.repository_name(e),
    sender_name: e => e.sender.login,
    sender: e => accessors.sender_name(e),
    number: e => e.issue.number,
    title: e => e.issue.title,
    repo_url: e => e.repository.html_url,
    sender_url: e => e.sender.html_url,
    issue_url: e => e.issue.html_url,
    assignee: e => e.assignee.login,
    assignee_url: e => e.assignee.html_url,
    comment_url: e => e.comment.html_url,
};

module.exports = accessors;
