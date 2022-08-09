import Vue from 'vue';

function changeStr (str) {
  return str.split ('/')[0];
}

const requireComponent = require.context ('./', true, /\.vue$/),

  install = () => {
    requireComponent.keys ().forEach (fileName => {
      let config = requireComponent (fileName),
        componentName = changeStr (
          fileName.replace (/^\.\//, '').replace (/\.\w+$/, '')
        );

      Vue.component (componentName, config.default || config);
    });
  };

install ();
