const core = require('@actions/core');
const a = require('./eventAccessors.js');

// 40 zeroes
const emptyRef = "0000000000000000000000000000000000000000";
const refNameReg = /^refs\/(heads|tags)\//;

const isCreated = e => e.before === emptyRef;
const isDeleted = e => e.after === emptyRef;
const isForced = e => e.forced;
const isTag = e => ref(e).startsWith('refs/tags/');
const ref = e => e.ref || '';
const refName = e => ref(e).replace(refNameReg, '');
const baseRef = e => e.base_ref || '';
const baseRefName = e => baseRef(e).replace(refNameReg, '');

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

const prettify = text => abbreviate(text, null, null, short => short.replace(/[[:punct:]]+\z/, ''));

const formatCommitMessage = (e, commit, formatter) => {
    const author = commit.author ? commit.author.name : '';
    return `${a.repository_name(e)}/${refName(e)} ${formatHash(commit.id)} ${author}: ${prettify(fullCommitMessage(commit))}`;
};

module.exports = (e, sf, mf) => {
    let subject = `${sf.format_front(e, a)}`;
    let message = `${mf.format_front(e, a)}`;

    if (isCreated(e)) {
        if (isTag(e)) {
            subject += ` tagged ${refName(e)} at `;
            message += ` tagged ${refName(e)} at `;

            if (e.base_ref) {
                subject += baseRefName(e);
                message += baseRefName(e);
            } else {
                subject += formatHash(e.after);
                message += formatHash(e.after);
            }
        } else {
            subject += ` created ${refName(e)}`;
            message += ` created ${refName(e)}`;
            
            if (e.base_ref) {
                subject += ` from ${baseRefName(e)}`;
                message += ` from ${baseRefName(e)}`;
            } else {
                subject += ` at ${formatHash(e.after)}`;
                message += ` at ${formatHash(e.after)}`;
            }

            const l = distinctCommits(e).length;
            
            subject += ` (+${sf.format_number(l, 'new commit', 'new commits')})`;
            message += ` (+${mf.format_number(l, 'new commit', 'new commits')})`;
        }
    } else if (isDeleted(e)) {
        subject += ` deleted ${refName(e)} at ${formatHash(e.before)}`;
        message += ` deleted ${refName(e)} at ${formatHash(e.before)}`;
    } else if (isForced(e)) {
        subject += ` force-pushed ${refName(e)} from ${formatHash(e.before)} to ${formatHash(e.after)}`;
        message += ` force-pushed ${refName(e)} from ${formatHash(e.before)} to ${formatHash(e.after)}`;
    } else if (e.commits.length !== 0 && distinctCommits(e).length === 0) {
        if (e.base_ref) {
            subject += ` merged ${baseRefName(e)} into ${refName(e)}`;
            message += ` merged ${baseRefName(e)} into ${refName(e)}`;
        } else {
            subject += ` fast-forwarded ${refName(e)} from ${formatHash(e.before)} to ${formatHash(e.after)}`;
            message += ` fast-forwarded ${refName(e)} from ${formatHash(e.before)} to ${formatHash(e.after)}`;
        }
    } else {
        const l = distinctCommits(e).length;
        subject += ` pushed ${sf.format_number(l, 'new commit', 'new commits')} to ${refName(e)}`;
        message += ` pushed ${mf.format_number(l, 'new commit', 'new commits')} to ${refName(e)}`;
    }

    message += `: ${mf.format_link(summaryUrl(e), 'check')}`;
    message += mf.nl();
    message += mf.format_list(distinctCommits(e).map(commit => formatCommitMessage(e, commit, mf)));

    return {
        subject: subject,
        message: message,
    };
};
