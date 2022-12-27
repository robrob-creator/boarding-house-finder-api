"use strict";

var internals = {};
const BoardingHouse = require("../../database/models/boardingHouse");

internals.add_boardingHouse = async (req, res) => {
  let id = req.auth.credentials.id;
  let photos = req.payload.photos;
  let newBoardingHouse = BoardingHouse({
    owner: req.auth.credentials.id,
    ...req.payload,
    status: { status: req.payload.status, updatorId: id },
  });
  if (photos && !Array.isArray(photos)) photos = [photos];

  if (photos && Array.isArray(photos)) {
    // let photosUrl = await getUrlsArray(photos, newReview._id, "ReviewPhotos");
    // newOffer.photos = photosUrl;
  }

  return await BoardingHouse.findOne({ name: req.payload.name }).then(
    (data, error) => {
      console.log(error);
      if (error)
        return res
          .response({
            message: "There is an error in the server.",
            data: [],
          })
          .code(500);

      if (data) {
        return res
          .response({
            message: "Entry already exists",
          })
          .code(409);
      }
      return newBoardingHouse
        .save()
        .then(() => {
          return res
            .response({
              message: "Successfully added.",
            })
            .code(200);
        })
        .catch((err) => {
          return res
            .response({
              message: "Unprocessable entity.",
              data: [],
            })
            .code(422);
        });
    }
  );
};

internals.get_boardingHouse_list = async (req, reply) => {
  let { id, name, address, status, searchKey, owner, deleted } = req.query;

  try {
    let query = {};

    if (id) {
      query = { ...query, _id: id };
    }

    if (name) {
      query = { ...query, name };
    }

    if (address) {
      query = { ...query, address };
    }
    if (owner) {
      query = { ...query, owner };
    }
    if (deleted) {
      query = { ...query, deleted };
    }
    if (searchKey) {
      query = {
        ...query,
        $or: [
          {
            name: new RegExp(searchKey, "i"),
          },
        ],
      };
    }

    if (status) {
      query = {
        ...query,
        $expr: { $eq: [{ $last: "$status.status" }, status] },
      };
    }

    let boardingHouseList = await BoardingHouse.find(query);
    return reply
      .response({
        errorCodes: [],
        data: {
          boardingHouseList,
        },
      })
      .code(200);
  } catch (e) {
    return reply
      .response({
        message: "Internal Server Error",
        errorCodes: [{ code: "temp", message: "Internal Server Error" }],
        data: [],
      })
      .code(500);
  }
};
internals.delete_boarding_house = async (req, res) => {
  return await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        deleted: true,
      },
    },
    { new: true }
  )
    .then((data) => {
      return res
        .response({
          message: "Deleted successfully",
        })
        .code(200);
    })
    .catch(() => {
      return res.reponse({ message: "Error in the server" }).code(500);
    });
};
internals.edit_boarding_house = async (req, res) => {
  return await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        ...req.payload,
      },
    },
    { new: true }
  )
    .then((data) => {
      return res
        .response({
          message: "Deleted successfully",
        })
        .code(200);
    })
    .catch(() => {
      return res.reponse({ message: "Error in the server" }).code(500);
    });
};
module.exports = internals;
