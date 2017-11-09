"use strict";
/*eslint no-undef: "off"*/
/*eslint no-console: "off"*/
process.env.TMPDIR = "tmp"; // to avoid the EXDEV rename error, see http://stackoverflow.com/q/21071303/76173
const __cwd = process.cwd();
const path = require("path");
const express = require("express");
const compression = require("compression");

const expressPort = 8080;
const publicFolder = "dist";
const app = express();


app.use(compression());
app.disable("x-powered-by");

app.use("/", express.static(path.join(__cwd, publicFolder)));

app.use("/js/", express.static(path.join(__cwd, publicFolder, "js")));

app.use("/edit/*", function (req, res) {
  res.sendFile(path.join(__cwd, publicFolder, "index.html"));
});

app.use("/new", function (req, res) {
  res.sendFile(path.join(__cwd, publicFolder, "index.html"));
});

app.get("/index.html", function (req, res) {
  res.sendFile(path.join(__cwd, publicFolder, "index.html"));
});


app.listen(expressPort, () => {
  if(process.env.NODE_ENV === "development") {
    console.log(process.env.NODE_ENV, "mode");
    console.log(`Listening on port ${expressPort}`);
  }
});
