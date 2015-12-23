var fs = require('fs');
var path = require('path');
var bindings = require('bindings');
var project = require('./project.js');

var ROOT_DIR = path.resolve(__dirname, "..");

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
exports.version = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, "package.json"), 'utf8')).version;
