const Archiver = require("archiver");
const fs = require("fs");
let version = "2.4";

if (process.env.TRAVIS_BUILD_NUMBER) {
    version = `${version}.${process.env.TRAVIS_BUILD_NUMBER}`;
} else {
    version = `${version}.0-SNAPSHOT`
}

const path = `${__dirname}/dist/JAlgoArena-UI-${version}.zip`;
const output = fs.createWriteStream(path);
const archive = new Archiver("zip", {store: true});

archive.on("error", function(err) {
    throw err;
});

archive.pipe(output);
archive.directory("./build/", false);
archive.finalize();
