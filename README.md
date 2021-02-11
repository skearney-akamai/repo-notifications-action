# Repository Notifications action

The fundamental idea of this action is to make it easy to propagate information about different kinds of possible events
in your repository to other places. This specific version listens to the different events and formats them in a nice
way, giving you two outputs - one summary which doesn't use HTML, and one larger HTML message which contains links and
describes the specific event that took place. The idea is that you can simply pipe this into other actions that sends
this information to devices of any kind.


## Usage

The only thing you need to do to use this action is to give it the event in JSON format. You can trigger exactly which
event it should handle depending on which events you specify in `on`, or you can use an `if` filter to be more specific.

```workflow
name: 
on: [push, issues]

jobs:
  notify:
   runs-on: ubuntu-latest
   steps:
     - name: calculate message
       uses: olabiniV2/repo-notifications-action@v0.0.1
       id: messages
       with:
          event: ${{ toJson(github.event) }}
     - run: echo ${{ steps.messages.outputs.subject }} 
     - run: echo ${{ steps.messages.outputs.message }} 
```


## Support

Currently, not all events are supported. The ones that currently work are `create`, `delete`, `fork`, `gollum`,
`issue_comment`, `issues`, `label`, `milestone`, `pull_request`, `push` and `status`. This should cover most peoples
needs. For some reason, Github Actions doesn't support the `commit_comment` event, even though it's available in the web
hooks. I would personally find `commit_comment` quite useful for this project, since my team generally uses them for
code review, but for now it isn't here. If you find the default configuration of this tool too noisy, remember that you
can use the `on` parameter to change what actions will trigger it. Of course, you can also use the more specific
variations to change exactly which actions generate comments as well, in the same manner.
