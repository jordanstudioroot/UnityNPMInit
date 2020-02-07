#!/usr/bin/env node

let fs = require('fs');
let mkdirp = require('mkdirp');
let path = require('path');

console.log('Initializing Unity project as npm package.');

// Get package root directory and file name
let rootDir = process.cwd();
let rootFile = path.basename(rootDir);

// Get package name
let args = process.argv.slice(2);
let packageName = '';

if (args[0]) {
    packageName = args[0];    
}
else {
    console.log('Package name not provided. Setting package name to '
        + ' project root file name.');
    packageName = rootFile;
}

// verify project directory structure
const dirSrc = path.join(rootDir, 'Assets', packageName);

if (!fs.existsSync(dirSrc)) {
    console.log('Source directory, ' + dirSrc + ' not found. Creating'
        + ' source directory.');
	mkdirp(dirSrc, function(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
}

// Get or create package.json
const dirJSON = path.join(rootDir, 'package.json');
let packageJSON = {};

if (fs.existsSync(dirJSON)) {
    packageJSON = JSON.parse(
        fs.readFileSync(dirJSON)
    );
}
else {
    fs.writeFileSync(
        dirJSON,
        ''
    );
}

packageJSON['name'] = packageName;

// create scripts folder
const dirLocalScripts = path.join(rootDir, 'scripts');
const dirPkgScripts = path.join(__dirname, 'scripts');

if (!fs.existsSync(dirLocalScripts)) {
    // add script to scripts dir
    fs.mkdirSync(dirLocalScripts);
}

if (!fs.existsSync(path.join(dirLocalScripts, 'postinstall.js'))) {
    fs.writeFileSync(
        path.join(dirLocalScripts, 'postinstall.js')
    );
}

fs.copyFileSync(
    path.join(
        dirPkgScripts, 'postinstall.js'
    ),
    path.join(
        dirLocalScripts, 'postinstall.js'
    )
);

// copy postinstall.js to scripts folder

// set postinstall script for unity package

/*packageJSON.scripts["postinstall"] =
    "node scripts/postinstall.js " + packageName.toString();
*/

// add file list to package.json
if (packageJSON.files) {
    packageJSON.files.push('Assets/' + packageName);
    packageJSON.files.push('scripts');
}
else {
    packageJSON['files'] = [
        'Assets/' + packageName,
        'scripts'
    ];
}

if (!packageJSON.scripts) {
    packageJSON.scripts = {
        'postinstall':'node scripts/postinstall.js'
    };
}
else {
    packageJSON.scripts['postinstall'] = 'node scripts/postinstall.js ' + packageName;
}

// dependencies
if (!packageJSON.dependencies) {
    packageJSON['dependencies'] = {};
}

packageJSON.dependencies['ncp'] = '^2.0.0';
packageJSON.dependencies['mkdirp'] = '^0.5.1';

// write edits to package.json
fs.writeFileSync(dirJSON, JSON.stringify(packageJSON));




