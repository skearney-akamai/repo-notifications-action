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
