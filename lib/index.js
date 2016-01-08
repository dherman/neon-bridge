var fs = require('fs');
var path = require('path');
var bindings = require('bindings');
var toml = require('toml');

var ROOT_DIR = path.resolve(__dirname, "..");

function getDefaultRoot() {
  // get the next filename out from this one in the call stack
  var callingFilename = bindings.getFileName(__filename);

  // find the project root for that file
  return bindings.getRoot(callingFilename);
}

function fileExistsSync(filename) {
  try {
    return fs.statSync(filename).isFile();
  } catch (e) {
    return false;
  }
}

function findAddon(root, manifest, lib) {
  if (!manifest) {
    manifest = path.resolve(root, "Cargo.toml");
  }
  var config = toml.parse(fs.readFileSync(manifest, 'utf8'));
  if (!lib) {
    lib = config.package.name.replace(/-/g, "_");
  }
  var debug = path.resolve(root, "build", "Debug", lib + ".node");
  var release = path.resolve(root, "build", "Release", lib + ".node");
  return fileExistsSync(debug) ? debug : release;
}

function load(opts) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else if (!opts) {
    opts = {};
  }

  var root = opts.root || getDefaultRoot();
  return require(findAddon(root, opts.manifest, opts.name));
}

function headers() {
  require('nan');
}

exports.load = load;
exports.headers = headers;
exports.version = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, "package.json"), 'utf8')).version;
