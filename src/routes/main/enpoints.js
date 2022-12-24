"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: ["GET"],
    path: "/",
    handler: Handlers.welcome,
    config: {
      auth: false,
    },
  },
];

module.exports = internals;
