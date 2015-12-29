var fs = require('fs');
var path = require('path');
var bindings = require('bindings');
var project = require('./project.js');

var ROOT_DIR = path.resolve(__dirname, "..");

function getDefaultRoot() {
  // get the next filename out from this one in the call stack
  var callingFilename = bindings.getFileName(__filename);

  // find the project root for that file
  return bindings.getRoot(callingFilename);
}

function load(opts) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else if (!opts) {
    opts = {};
  }

  var root = opts.root || getDefaultRoot();
  var addon = project(root, opts.manifest, opts.name).getAddonPath();

  return require(addon);
}

function headers() {
  require('nan');
}

exports.load = load;
exports.headers = headers;
exports.version = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, "package.json"), 'utf8')).version;
