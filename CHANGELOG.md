# 0.2.5
- ```collectJadeMixins``` task replaced with ```collectFilenames``` - universal task to collect any kind of includes. For example, a task to collect SCSS includes in desirible order: 
    lazyTask('styles:includes', './tasks/collectFilenames', {
      dir        : [
        path.join(config.dir.stl, 'core'),
        path.join(config.dir.stl, 'mixins'),
        path.join(config.dir.stl, 'modules'),
        path.join(config.dir.stl, 'components'),
        path.join(config.dir.stl, 'partials'),
        path.join(config.dir.stl, 'pages'),
      ],
      outputFile : path.join(config.dir.tmp, 'styles/includes.scss'),
      prepend    : '@import "../../',
      append     : '";\n',
    });
All includes will follow the order given in ```dir``` option.
- styles were reorganized to easy usage with ```collectFilenames``` task
- tasks were renamed, see ```gulpfile.js```
- some bugfixes and tiny improvements in plugins
- bemto update to 1.0.2, by default has ```- set_bemto_settings({ flat_elements: false })``` option in the ```layouts/layout-default.jade```
- environment variables and their default value changes to suite common default naming