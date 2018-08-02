const Archiver = require("archiver");
const fs = require("fs");
let version = "2.4.11";

if (process.env.TRAVIS_BUILD_NUMBER) {
    version = `${version}.${process.env.TRAVIS_BUILD_NUMBER}`;
}

const path = `${__dirname}/dist/JAlgoArena-UI-${version}.zip`;
const output = fs.createWriteStream(path);
const archive = new Archiver("zip", {store: true});

archive.on("error", function(err) {
    throw err;
});

archive.pipe(output);

archive.directory("./public", { name: "public"});
archive.directory("./node_modules", { name: "node_modules"});
archive.directory("./server", { name: "server"});
archive.directory("./assets", { name: "assets"});
archive.file("./server.js");

archive.finalize();
