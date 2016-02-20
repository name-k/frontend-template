# Frontend project template
This template is created and supported according to my own tasks and needs. 
You are welcome to use it, but I'm not really into writing full docs right now. 
Though, it should be easy enough to look at gulpfile.js and ./tasks to understand what is going on.

## Noticeable features
- everybody loves gulp!
- webpack for js
- lazy modules load
- lots of caching and speed optimizing
- tasks for: templates, styles, rasterized images, svg, any other static assets
- combined tasks for full dev launch and quick start on existing project

## First things to do
- clone the repo
- setup paths in ./build.config.js
- setup webpack config in ./tasks/js.js
- have fun

## Gulp#4
Starting from version 0.1.0 Gulp v4 is used, which is still in alpha.
If you are not willing to install alpha version globally, you should run all the tasks with your local installation like this ```./node_modules/.bin/gulp yourtask```.
The better option is to add ```./node_modules/.bin/gulp``` to your path variable, so when you call ```gulp``` in the project folder - local gulp will be used, otherwise - global. 
Also you can run tasks with ```npm script```

## What's next
- webpack dev server and hot module replacement
- revision naming for longterm caching support
- get rid of jquery, completely (also includes update of all plugins in ./src/js/
plugins)
- wrap some more of my everyday-useful scripts with ES6 classes and optimize that what already exist (because they are not)

