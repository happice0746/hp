# MY HAPPY FRONTEND FRAMEWORK🤓

## Description

This is a mini-program DSL application.

I used node and socket to simulate cross-platform environment

The browser used for simulating webview container.

The node used for simulating native layer.

## File analysis

- 'driver.ts' can start the project.

- 'src' is the source directory.

  - 'src/app.js' was used to register App.
  - 'src/app.json' was used to register Page
  - 'src/page' was used to store page file

- 'devTool' can build socket and web server

  - 'devTool/init.ts' declare Appinit function
  - 'devTool/socket-driver.ts' build server socket
  - 'devTool/public' is the webview container
    - 'devTool/public/\_devToolBridge.js' build client socket
    - 'devTool/public/bootstraps.js' to handle 'Native' command
    - 'devTool/public/bridge.js' was used to simulate the communication between 'native' and 'webview'
    - 'devTool/public/index.html' will mounted our app

- 'compiler'

  - 'complier/hp/tokenizer.ts' tokenizer the file with .hp as suffix firstly.
  - 'complier/hp/parser.ts' parser the tokens to AST secondly.
  - 'complier/hp/transformer.ts' transformer AST to render function lastly.
  - 'complier/hpss/transformer.ts' transformer the file with .hpss as suffix.
  - 'complier/js/transformer.ts' js code will be pack to handleJS function
  - 'compiler/context.ts' declare Context class that used to handle code.
  - 'compiler/index.ts' handle src to page-service(bundle)

- 'core' implement some function like App, HNavigator, Channel etc.
  - 'core/app.ts' App class
  - 'core/channel.ts' Channel class can communicate to render layer
  - 'core/navigator.ts' Navigator class
  - 'core/page.ts' Page class
  - 'core/render.ts' Render class can diff(generator render commands) and createNode(create Virtual Dom Tree)
  - 'core/utils.ts' deepEqual and handleUrl
