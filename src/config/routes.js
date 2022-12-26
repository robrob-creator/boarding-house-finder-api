"use strict";

var internals = {};

// Endpoints
let User = require("../routes/user/endpoints");
let Main = require("../routes/main/endpoints");
let BoardingHouse = require("../routes/boardingHouse/endpoints");
internals.routes = [
  ...User.endpoints,
  ...Main.endpoints,
  ...BoardingHouse.endpoints,
];

internals.init = function (server) {
  server.route(internals.routes);
};

module.exports = internals;
