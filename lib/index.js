var bindings = require('bindings');
var project = require('./project.js');

function getDefaultRoot() {
  return bindings.getRoot(bindings.getFileName(__filename));
}

function load(opts) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else if (!opts) {
    opts = {};
  }
  return require(project(opts.root || getDefaultRoot(), opts.manifest, opts.name).getAddonPath());
}

exports.load = load;
exports.project = project;
