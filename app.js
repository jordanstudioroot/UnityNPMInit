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

console.log(dirSrc);
if (!fs.existsSync(dirSrc)) {
    console.log("dir not found");
	mkdirp(dirSrc, function(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
}

console.log("Aw shit.");

// edit package.json
packageJSON = JSON.parse(
    fs.readFileSync(
        dirJSON
    )
);

if (!packageJSON) {
    console.log("package.json could not be found. Has npm init been run at the"
        + "root of the Unity project?");
}

//scripts
packageJSON.scripts["postinstall"] =
    "node scripts/postinstall.js " + packageName.toString();

// files
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

fs.writeFileSync(dirJSON, JSON.stringify(packageJSON));




