// react_ujs is going to expect these and our components to be exported globablly, so here we go
require('expose?React!react');
require('expose?ReactDOM!react-dom');

// react_ujs is going to want all of our react components exposed globally, so go ahead and do that
// note: i'm not entirely sure what passing context to keys().map does here 🤔, but it follows
// the example here: https://webpack.github.io/docs/context.html#context-module-api
(
  (context) => { context.keys().map(context) }
)(require.context("./root_components", true, /\.(js|jsx)$/));
