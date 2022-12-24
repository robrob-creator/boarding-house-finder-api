"use strict";

var internals = {};

// Endpoints
let User = require("../routes/user/endpoints");
let Main = require("../routes/main/endpoints");
internals.routes = [...User.endpoints, ...Main.endpoints];

internals.init = function (server) {
  server.route(internals.routes);
};

module.exports = internals;
