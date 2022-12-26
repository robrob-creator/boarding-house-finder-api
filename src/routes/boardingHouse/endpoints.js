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
  {
    method: ["GET"],
    path: "/offer/{id}",
    handler: Handlers.get_offer,
    config: {
      auth: false,
    },
  },
  {
    method: ["POST"],
    path: "/offer/{id}",
    handler: Handlers.update_offer,
    config: {
      auth: "token",
    },
  },
  {
    method: ["GET"],
    path: "/establishments/list", //Accommodation
    handler: Handlers.establishment_list,
    config: {
      auth: "token",
    },
  },
];

module.exports = internals;
