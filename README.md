# Frontend project template
This template is created and supported according to my tasks and needs. 
You are welcome to use it, but I'm not really into writing full docs. 
Though, it should be easy enough to look figure it out after checking gulpfile.js and ./tasks/*.js files.

*Meanwhile, I did write some description.*

This template works best for you if:
- you familiar with gulp and webpack
- you use SCSS/SASS for styles
- you use Jade for templates
- you write JS in ES2015 and modularize your code
- you like to configure tiny details (not so beautiful, but more flexible)
- you prefer to lint in your text editor (ST3 works best for me)

*anyway you can configure and replace any module in the project*

## Things to notice
- lazy gulp modules load
- webpack with babel for js
- tasks for: templates, styles, svg, rasterized images, static assets
- combined tasks for full dev launch and quick re-launch on existing project (check with ```gulp --tasks```)
- webpack works as webpack does, not as gulp stream, also uses its watcher
- ```NODE_ENV=dev|prod|{whatever}```, by default acts like if 'dev'
- ```NODE_WATCH=true|false```, by default acts like if 'true'
- ```NODE_DEBUG=true|false```, by default acts like if 'false' (enables gulp-debug)

## Steps to start
- clone the repo
- ```npm i```
- setup paths in ./build.config.js
- setup webpack config in ./tasks/js.js (not required)
- ```gulp dev```, should use local gulp or install gulp#4 globally, read more below

## Gulp#4
Starting from version 0.1.0 of this project, Gulp v4 is used, which is still in alpha.
If you are not willing to install the alpha version globally, you should run all the tasks with your local installation like this ```./node_modules/.bin/gulp <yourtask>```.
The better option is to add ```./node_modules/.bin``` to your path variable, so when you call ```gulp``` in the project folder - local gulp will be used, otherwise - global (if you have it installed globally). 
Also you can setup tasks to run with ```npm script```, something like that ```"<taskName>" : "./node_modules/.bin/gulp <yourtask>"```, check ```package.json``` for existing tasks.


## TODO
- webpack dev server and hot module replacement
- revision naming for longterm caching support
- get rid of jquery, completely (also includes update of all plugins in ./src/js/
plugins)
- wrap some more of my everyday-used scripts with ES6 classes and optimize those which already exist (because they are not)
- upload plugins as npm packages

