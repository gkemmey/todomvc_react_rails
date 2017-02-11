An example TodoMVC implementation using Rails with React and Redux. You can see it running [here](https://gray-matter-todomvc.herokuapp.com/).

### About the Setup

I wrote a post explaining how this application integrates Rails with React and Redux [here](http://blog.graykemmey.com/2017/01/19/how-to-use-react-with-rails/).

### Uh, Why Are Your Javascript Bundles Committed?

Yeah, I don't necessarily recommend doing things that way. But since this is meant to be a quick example, it's easiest to deploy this to Heroku if the bundle files are just committed to source control. Otherwise, you gotta switch buildpacks to something that knows how to run webpack. Ugh, effort 😑
