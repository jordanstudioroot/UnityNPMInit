#!/usr/bin/env node

let fs = require('fs');
let mkdirp = require('mkdirp');
let path = require('path');
let readline = require('readline');

console.log('Initializing Unity project as npm package.');

// Get package root directory and file name
let rootDir = process.cwd();
let rootFile = path.basename(rootDir);

// create scripts folder
const dirLocalScripts = path.join(rootDir, 'scripts');
const dirPkgScripts = path.join(__dirname, 'scripts');

if (!fs.existsSync(dirLocalScripts)) {
    fs.mkdirSync(dirLocalScripts);
}

// create postinstall script
if (!fs.existsSync(path.join(dirLocalScripts, 'postinstall.js'))) {
    fs.copyFileSync(
        path.join(
            dirPkgScripts, 'postinstall.js'
        ),
        path.join(
            dirLocalScripts, 'postinstall.js'
        )
    );
}
else {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("/scripts/postinstall.js found. Overwrite?" +
        "\n\t Y[es]/N[o] (No will abort initialization.)",
    (answer) => {
        if (`${answer}`.match('^[Yy]')) {
            fs.copyFileSync(
                path.join(
                    dirPkgScripts, 'postinstall.js'
                ),
                path.join(
                    dirLocalScripts, 'postinstall.js'
                )
            );
        }
        else {
            console.log('Aborting initialization.');
            rl.close();
            process.exit(1);
        }

        rl.close();
    });
}

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
packageJSON['version'] = '1.0.0';


// copy postinstall.js to scripts folder

// set postinstall script for unity package

/*packageJSON.scripts["postinstall"] =
    "node scripts/postinstall.js " + packageName.toString();
*/

// add file list to package.json
if (packageJSON.files) {
    // Declare required file names.
    let packageFile = 'Assets/' + packageName;
    let scriptsFile = 'scripts';

    // Check if sub-fields already exist in files.
    let filesHasPackage = packageJSON.files.indexOf(packageFile);
    let filesHasScripts = packageJSON.files.indexOf(scriptsFile);

    // Push file name to files field if not present.
    if (!filesHasPackage) {
        packageJSON.files.push('Assets/' + packageName);        
    }

    if (!filesHasScripts) {
        packageJSON.files.push('scripts');
    }
}
else {
    // Else create files field.
    packageJSON['files'] = [
        'Assets/' + packageName,
        'scripts'
    ];
}

if (!packageJSON.scripts) {
    packageJSON.scripts = {
        'postinstall':'node scripts/postinstall.js ' + packageName
    };
}
else {
    packageJSON.scripts['postinstall'] = 'node scripts/postinstall.js ' + packageName.toString();
}

// dependencies
if (!packageJSON.dependencies) {
    packageJSON['dependencies'] = {};
}

packageJSON.dependencies['ncp'] = '^2.0.0';
packageJSON.dependencies['mkdirp'] = '^0.5.1';

// write edits to package.json
fs.writeFileSync(dirJSON, JSON.stringify(packageJSON));

// write gitignore
fs.copyFileSync(
    path.join(__dirname, 'newgitignore'),
    path.join(rootDir, '.gitignore')
);




