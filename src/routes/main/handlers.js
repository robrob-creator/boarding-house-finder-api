"use strict";

const bcrypt = require("bcryptjs");
const User = require("../../database/models/User");

var internals = {};

internals.welcome = async (req, reply) => {
  try {
    return reply
      .response({
        message: "Welcome to Boarding house finder api.",
      })
      .code(200);
  } catch (e) {
    console.log(e);
    return reply
      .response({
        errorMessage: e,
      })
      .code(500);
  }
};

module.exports = internals;
