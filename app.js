#!/usr/bin/env node

console.log("Initializing Unity project as npm package.");

let fs = require('fs');
let mkdirp = require('mkdirp');
let path = require('path');

let args = process.argv.slice(2);
let packageName = "";

const dirJSON = path.join(__dirname, '..', '..', 'package.json');

if (args[0]) {
    packageName = args[0];    
}
else {
    throw new Error("Must provide a package name as an argument.\n" +
    "\tExample: node unitynpminit COMPANY_NAME.PACKAGENAME");
}

const dirSrc = path.join(__dirname, '..', '..', 'Assets', packageName);

// verify project directory structure
if (!fs.existsSync(dirSrc)) {
    console.log("Source directory, " + dirSrc + " not found. Creating"
        + " source directory.");
	mkdirp(dirSrc, function(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
}

// get package.json as object if it exists
if (fs.existsSync(dirJSON)) {
    packageJSON = JSON.parse(
        fs.readFileSync(
            dirJSON
        )
    );
}
// else create new object for package.json
else {
    packageJSON = {
        name: packageName.toString()
    };
}

// set postinstall script for unity package
packageJSON.scripts["postinstall"] =
    "node scripts/postinstall.js " + packageName.toString();

// add file list to package.json
if (packageJSON.files) {
    packageJSON.files.push("Assets/" + packageName);
}
else {
    packageJSON['files'] = [];
    packageJSON['files'].push("Assets/" + packageName);
}

// dependencies
packageJSON.dependencies["ncp"] = "^2.0.0";
packageJSON.dependencies["mkdirp"] = "^0.5.1";

// write edits to package.json
fs.writeFileSync(dirJSON, JSON.stringify(packageJSON));




