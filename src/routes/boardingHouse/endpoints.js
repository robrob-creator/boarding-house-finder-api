"use strict";
const Hapi = require("@hapi/hapi");
const Path = require("path");
var fs = require("fs");
const { Readable } = require("stream");
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
    method: "GET",
    path: "/images/{param*}",
    handler: {
      directory: {
        path: "src/routes/boardingHouse/uploads",
        listing: true,
        index: false,
      },
    },
  },
  {
    method: "GET",
    path: "/uploads",
    handler: (request, response) => {
      return fs.readFile(
        "src/routes/boardingHouse/uploads",
        function (err, content) {
          // Serving the image
          return response.response(content);
        }
      );
    },
  },
  {
    path: "/upload/{id}",
    method: "POST",
    options: {
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        maxBytes: 2 * 1000 * 1000,
        multipart: true,
      },
      handler: (request, response) => {
        var result = [];
        for (var i = 0; i < request.payload["file"].length; i++) {
          result.push(request.payload["file"][i].hapi);
          request.payload["file"][i].pipe(
            fs.createWriteStream(
              __dirname +
                `/uploads/${request.params.id}--` +
                request.payload["file"][i].hapi.filename
            )
          );
        }
        return response.response(result);
      },
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
    method: ["POST"],
    path: "/edit-boarding-house/{id}",
    handler: Handlers.edit_boarding_house,
    config: {
      auth: "token",
    },
  },
  {
    method: ["POST"],
    path: "/delete-boarding-house/{id}",
    handler: Handlers.delete_boarding_house,
    config: {
      auth: "token",
    },
  },
];

module.exports = internals;
