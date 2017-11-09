"use strict";
/*eslint no-undef: "off"*/

const {
  FuseBox,
  JSONPlugin,
  CSSResourcePlugin,
  CSSPlugin,
  BabelPlugin,
  QuantumPlugin,
  EnvPlugin
} = require("fuse-box");
const path = require("path");
const express = require("express");
const {
  LESSPlugin
} = require("fuse-box");

let isProduction = false;

if ((process.env.NODE_ENV) && (process.env.NODE_ENV === "production")) {
  isProduction = true;
}

const destFolder = (isProduction) ? "dist" : "dev";

const fuse = FuseBox.init({
  homeDir: "src",
  output: `./${destFolder}/js/$name.js`,
  cache: !isProduction,
  sourceMaps: !isProduction,
  polyfillNonStandardDefaultUsage: true,
  plugins: [
    JSONPlugin(),
    EnvPlugin({
      NODE_ENV: isProduction ?
        "production" : "development"
    }),
    BabelPlugin({
      presets: [
        "es2015", "stage-2"
      ],
      sourceMaps: true,
      plugins: [
        ["transform-react-jsx", "transform-react-remove-prop-types"]
      ]
    }), [
      LESSPlugin({
        paths: [
          path.join(__dirname, "src", "less"),
        ]
      }), CSSPlugin()
    ],
    [CSSResourcePlugin(), CSSPlugin()],
    isProduction && QuantumPlugin({
      target : "browser",
      bakeApiIntoBundle : "app",
      treeshake : true,
      replaceProcessEnv : true,
      uglify: isProduction,
    })
  ]
});

const fuseDevOptions = {
  root: false,
  port: 8080,
  socketURI: "ws://localhost:33333"
};

if (isProduction === false) {
  fuse.dev(fuseDevOptions, server => {
    const dist = path.resolve("./dev");
    const app = server.httpServer.app;
    app.use("/", express.static(path.join(dist)));
    app.use("/js/", express.static(path.join(dist, "js")));
    app.use("/edit/*", function (req, res) {
      res.sendFile(path.join(dist, "index.html"));
    });
    app.use("/new", function (req, res) {
      res.sendFile(path.join(dist, "index.html"));
    });
    app.get("/index.html", function (req, res) {
      res.sendFile(path.join(dist, "index.html"));
    });
  });
}

const fuseBundle = fuse
  .bundle("app")
  .target("browser")
  .instructions(`>index.js`);

if (isProduction === false) {
  fuseBundle
    .log()
    .hmr()
    .watch();
}

fuse.run();