"use strict";

var internals = {};

// Endpoints
let User = require("../routes/user/endpoints");

internals.routes = [...User.endpoints];

internals.init = function (server) {
  server.route(internals.routes);
};

module.exports = internals;
