## Unity NPM Init
A lightweight NPM package which automatically initializes an existing Unity project as an NPM package which can be easily used as a dependency in another Unity project.

This package is being actively developed with the goal of making it easy manage dependencies using Github and NPM as an alternative to the [Unity Package Manager](https://docs.unity3d.com/Packages/com.unity.package-manager-ui@1.8/manual/index.html) for those who want a more transparent and flexible solution for managing dependencies between different Unity projects.

## Requirements
- Linux or [Windows Subsystem For Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
- Script must be run from root unity project directory. For example, if your project is located at `C:/users/$user/path/to/unity/project`, the script must be run from inside `../project`.

## Usage
Install package locally and run `node_modules\studioroot.unitynpminit\app.js [project name]` or install npx and run `npx github:jordanstudioroot/UnityNPMInit [project name]`

### Notes on NPX in the Windows command line.
Currently not official supported via node from the Windows command line. However, you can use [Windows Subsystem For Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10), cd into `./mnt/c/path/to/unity/project` and follow the current usage guide.

## Package Source Directory
For the initialized project, assets under `Assets/[project name]` are considered to be the package source code where `[project name]` is the argument provided when the script is run. If `[project name]` is not provided, the name of the projects root directory is used by default.


## Package As A Git Repository
Unity NPM Init automatically creates a `.gitignore` designed to make the project easy to initialize as a git repository.

## Recommendations
- Provide `[project name]` argument to avoid naming collisions.

## TODO
- [ ] Set project name argument in `postinstall.js` script.
- [ ] Official windows command line support.
- [ ] Cli interface for specifying version, description, and license.
- [ ] Cli interface for specifying alternative folders to use for source code instead of `./Assets/[package name]`.
- [ ] Verbose and silent modes.
- [ ] Better formatting for generated package.json.

## Criticisms, Suggestions, Pull Requests
Email: [jordannelson@protonmail.com](mailto:jordannelson@protonmail.com)

[Pull Requests](https://github.com/jordanstudioroot/UnityNPMInit/pulls)

## Bugs
Report on [issues](https://github.com/jordanstudioroot/UnityNPMInit/issues).
