const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardingHouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    available_rooms: { type: Number },
    address: { type: String, required: true },
    photos: { type: Array },
    status: { type: Array },
    map_link: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BoardingHouse", BoardingHouseSchema);
