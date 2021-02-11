const a = require('./eventAccessors.js');

// 40 zeroes
const emptyRef = "0000000000000000000000000000000000000000";
const refNameReg = /\Arefs\/(heads|tags)\//;

const isCreated = e => e.before === emptyRef;
const isDeleted = e => e.after === emptyRef;
const isForced = e => e.forced;
const isTag = e => e.ref.startsWith('refs/tags/');
const refName = e => e.ref.replaceAll(refNameReg, '');

const distinctCommits = e => e.distinct_commits ||
      e.commits.filter(commit =>
                       commit.distinct && commit.message.trim() !== '');

const branchUrl = e => `${a.repo_url(e)}/commits/${refName(e)}`;
const beforeShaUrl = e => `${a.repo_url(e)}/commits/${e.before}`;
const compareUrl = e => e.compare;

const summaryUrl = e => {
    if (isCreated(e)) {
        if (distinctCommits(e).length === 0) {
            return branchUrl(e);
        }
        return compareUrl(e);
    }
    if (isDeleted(e)) {
        return beforeShaUrl(e);
    }
    if (isForced(e)) {
        return branchUrl(e);
    }
    if (distinctCommits(e).length === 1) {
        return distinctCommits(e)[0].url;
    }
    return compareUrl(e);
};

const formatHash = h => h.substring(0, 6);
const fullCommitMessage = commit => commit ? commit.message : '';

const abbreviate = (text, suffix, length, tr) => {
    const t = text || '';
    const s = suffix || ' ...';
    const l = length || 200;
    const f = tr || (v => v);

    const content_length = l - s.length;
    let short = t.split(/\r?\n/)[0].trim().substring(0, content_length).trim();
    short = f(short);
    if (short !== t.trim()) {
        short += s;
    }
    return short;
};

const prettify = text => abbreviate(text, null, null, short => short.replaceAll(/[[:punct:]]+\z/, ''));

const formatCommitMessage = (e, commit, formatter) => {
    const author = commit.author ? commit.author.name : '';
    return `${a.repository_name(e)}/${refName(e)} ${formatHash(commit.id)} ${author}: ${prettify(fullCommitMessage(commit))}`;
};

module.exports = (e, sf, mf) => {
    let subject = `${sf.format_front(e, a)} `;
    let message = `${mf.format_front(e, a)} `;




    
    return {
        subject: subject,
        message: message,
    };
};
