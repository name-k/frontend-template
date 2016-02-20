# Frontend project template
This template is created and supported according to my own tasks and needs. 
You are welcome to use it, but I'm not really into writing full docs right now. 
Though, it should be easy enough to look at gulpfile.js and ./tasks to understand what is going on.

This project template will work for you if:
- you write JS in ES2015 and modularize everything
- you use eslint for linting in your editor, not in the console (ST3 works best for me)
- you like to configure every tiny detail (like myself)

## Noticeable features
- lazy gulp modules load
- lots of caching and speed optimizing
- webpack with babel for js
- tasks for: templates, styles, rasterized images, svg, any other static assets
- combined tasks for full dev launch and quick start on existing project
- ```NODE_ENV=dev|prod|{whatever}```, default - dev
- ```NODE_WATCH=true|false```, default - true
- ```NODE_DEBUG=true|false```, default - false (will write debug details for tasks)
- webpack works as webpack does, not as gulp stream, also uses built in watcher

## Steps to start
- clone the repo
- ```npm i```
- setup paths in ./build.config.js
- setup webpack config in ./tasks/js.js
- ```gulp dev```, should use local gulp or install gulp#4 globally, read more below

## Gulp#4
Starting from version 0.1.0 of this project, Gulp v4 is used, which is still in alpha.
If you are not willing to install the alpha version globally, you should run all the tasks with your local installation like this ```./node_modules/.bin/gulp <yourtask>```.
The better option is to add ```./node_modules/.bin``` to your path variable, so when you call ```gulp``` in the project folder - local gulp will be used, otherwise - global (if you have it installed globally). 
Also you can setup tasks to run with ```npm script```, something like that ```"<taskName>" : "./node_modules/.bin/gulp <yourtask>"```.

## TODO
- webpack dev server and hot module replacement
- revision naming for longterm caching support
- get rid of jquery, completely (also includes update of all plugins in ./src/js/
plugins)
- wrap some more of my everyday-useful scripts with ES6 classes and optimize that what already exist (because they are not)

