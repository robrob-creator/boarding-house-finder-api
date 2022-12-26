"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: ["POST"],
    path: "/boarding-house",
    handler: Handlers.add_boardingHouse,
    config: {
      auth: "token",
    },
  },

  {
    method: ["GET"],
    path: "/boarding-house-list",
    handler: Handlers.get_boardingHouse_list,
    config: {
      auth: false,
    },
  },
];

module.exports = internals;
