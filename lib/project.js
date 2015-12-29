var fs = require('fs');
var path = require('path');
var toml = require('toml');

function fileExistsSync(filename) {
  try {
    return fs.statSync(filename).isFile();
  } catch (e) {
    return false;
  }
}

function Project(root, manifest, libName) {
  this.root = root;
  this.manifest = manifest || path.resolve(root, "Cargo.toml");
  this.manifestContents = toml.parse(fs.readFileSync(this.manifest, 'utf8'));
  this.libName = libName || this.manifestContents.package.name.replace(/-/g, '_');
}

Project.prototype.getAddonPath = function getAddonPath() {
  var debug = path.resolve(this.root, "build", "Debug", this.libName + ".node");
  var release = path.resolve(this.root, "build", "Release", this.libName + ".node");
  return fileExistsSync(debug) ? debug : release;
};

module.exports = exports = function(root, manifest, libName) {
  return new Project(root, manifest, libName);
};
