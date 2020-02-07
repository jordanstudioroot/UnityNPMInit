var mkdirp = require('mkdirp');
var path = require('path');
var ncp = require('ncp');

// Package name
var package = "PACKAGE_NAME";

// Paths
var src = path.join(__dirname, '..', 'Assets', package);
var dir = path.join(__dirname, '..', '..', '..', 'Assets', 'pkg-all', package);

// Create folder if missing
mkdirp(dir, function (err) {
  if (err) {
    console.error(err)
    process.exit(1);
  }

  // Copy files
  ncp(src, dir, function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});