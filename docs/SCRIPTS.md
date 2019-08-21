Build Scripts
=============

`scripts/*`
  - general build scripts

`scripts/build-storybook-html.js`
  - the link between theming in the app and theming inside storybook
  - if it seems like something isn't quite working in storybook or the app that's
    related to theming you may have to take a look at what this file is doing and
    make sure it is executing correctly


NPM Scripts
===========

`test` - runs tests and enters watch mode
`test:ci` - for running tests without entering watch mode
