var mkdirp = require('mkdirp');
var path = require('path');
var ncp = require('ncp');

// get args
let args = argv.slice(2);

// Package name
var package = "PACKAGE_NAME";

// Paths
var src = path.join(__dirname, '..', 'Assets', args[0]);
var dir = path.join(__dirname, '..', '..', '..', 'Assets', 'pkg-all', args[0]);

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
