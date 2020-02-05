let fs = require("fs");
const mkdirp = require("mkdirp");

let args = process.argv.slice(2);

const packageName = "";

if (args[0]) {
    packageName = args[0];    
}
else {
    new Error("Must provide a package name as an argument.\n" +
    "\tExample: node unitynpminit COMPANY_NAME.PACKAGENAME");
    process.exit(1);
}

// verify project directory structure
var src = path.join(__dirname, '..', 'Assets', package);

if (!src) {
    mkdirp(src, function(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
}

// edit package.json
packageJSON = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, '..', 'package.json')
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
packageJSON.files.push("Assets/" + package);

// dependencies
packageJSON.dependencies["ncp"] = "^2.0.0";
packageJSON.dependencies["mkdirp"] = "^0.5.1";




