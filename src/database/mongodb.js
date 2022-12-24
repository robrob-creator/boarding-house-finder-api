"use strict";

var Mongoose = require("mongoose"),
  Config = require("../config");
var connection_string =
  "mongodb+srv://jess:password12345678@cluster0.edr8n3b.mongodb.net/test";

console.log("Config.mongodb", connection_string);
Mongoose.Promise = global.Promise;
Mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`mongodb initialize success`))
  .catch((err) => console.log(err));
