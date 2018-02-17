# Contributing to the Discord Frotz Bot

First off, before I go into detail on what to do to contribute, I just wanted
to say thanks for taking the time--or even just considering taking the time--to
contribute your time to this project! It means a lot, and is seriously
appreciated.

With that in mind, please follow the below steps to contribute:

## Fork, Clone, and Test

Before you get started, make sure to fork the repository onto your own GitHub.
This will allow you to make commits separate from the main repo, and submit a
pull request from your repo when the time comes to submit your code.

Once you've done that, you'll want to clone down that newly forked project, and
see if you can't get it running. You'll need to install all dependencies with
`npm install`, and you'll probably want to set up a Discord Bot User separate
from any "production" users that you use for this bot as well.

If you're not familiar with the process of creating a bot user, please refer to
the main documentation on
[Creating a Bot User](#https://github.com/aeolingamenfel/discord-text-adventure-bot#creating-a-bot-user).

Once you've got the current version of the bot working in Discord, you're ready
to start making changes. If you're having trouble getting a local copy working,
please open an issue and I'll try to help ASAP.

## Editing Code

Most of the code is moderately well commented, and you'll want you go through
and get at least a top level understanding of how the code works before you
start making tweaks.

For the most part, how you write the code, and the function of the code, is up
to you, however in terms of syntax, please generally follow the
[Google Javascript Style Guide](https://google.github.io/styleguide/jsguide.html).
This is not rigidly enforced, but should generally be followed. The only main
change from that style guide is you should use 4 space tabs instead of 2 space
tabs.

*Note:* In the future, there will be unit test requirements for the application,
but for the time being, it is up to you to test that the functionality you added
does not break any existing functionality, and works properly in Discord. This
will also be verified when you submit a PR.

Once you're done editing the code and making your changes, it's time to submit
a PR.

## Submitting Code

Submitting code should be done through the standard GitHub pull request system.
Please
[click here](https://github.com/aeolingamenfel/discord-text-adventure-bot/pulls)
for the pull requests related to this project, and to submit your own.

I will verify your code works, and doesn't break anything, and if so, will pull
the code into the main repository. I'll also take care of updating the NPM
version appropriately (so you do not have to) and updating the module on NPM.

## Recognition

I want to make sure that you recieve proper recognition for your efforts. GitHub
will automatically add your name to the list of contributors once your pushes
are accepted onto the `master` branch, but I will also go in and add to you the
`AUTHORS` file.

If you do not see your name appear in these places shortly after your PR is
accepted, please
[drop a line](https://github.com/aeolingamenfel/discord-text-adventure-bot/issues),
as it's possible I just forgot to add you in.

And of course, thanks for contributing!
