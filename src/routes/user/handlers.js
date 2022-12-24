"use strict";

const bcrypt = require("bcryptjs");
const User = require("../../database/models/User");

var internals = {};

internals.profile = async (req, reply) => {
  try {
    let _profile = await User.findOne({
      _id: req.auth.credentials._id,
    });

    let profile = JSON.parse(JSON.stringify(_profile));
    delete profile.password;
    delete profile.__v;
    delete profile.createdAt;
    delete profile.updatedAt;

    return reply
      .response({
        message: "Success.",
        data: {
          profile,
        },
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

internals.create_user = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.payload.password, 10);
  var payload = { ...req.payload, password: hashedPassword };
  var userData = new User(payload);

  return await User.findOne({ idNo: req.payload.idNo }).then((data, error) => {
    if (error)
      return res
        .response({
          message: "Error in the server",
        })
        .code(500);
    if (data)
      return res
        .response({
          message: "ID no. already taken.",
        })
        .code(409);
    else {
      return userData.save().then(async (data) => {
        return res.response(data).code(200);
      });
    }
  });
};
internals.create_teacher = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.payload.password, 10);
  var payload = { ...req.payload, password: hashedPassword };
  var userData = new User(payload);

  return await User.findOne({ idNo: req.payload.userName }).then(
    (data, error) => {
      if (error)
        return res
          .response({
            message: "Error in the server",
          })
          .code(500);
      if (data)
        return res
          .response({
            message: "Username already taken.",
          })
          .code(409);
      else {
        return userData.save().then(async (data) => {
          return res.response(data).code(200);
        });
      }
    }
  );
};
internals.get_user = async (req, h) => {
  let { id, role } = req.query;
  let query = {};

  try {
    if (role) {
      query = { ...query, role: { $in: [role] } };
    }
    if (id) {
      query = { ...query, _id: id };
    }
    let list = await User.find(query);
    return h
      .response({
        errorCodes: [],
        data: {
          list,
        },
      })
      .code(200);
  } catch (err) {}
};

internals.updateRole = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  const payload = { ...req.payload };

  let r = await User.findOneAndUpdate(filter, payload);
  console.log(r);
  return res.response({ message: "success" }).code(200);
};
internals.edit_user = async (req, res) => {
  const updatorId = req.auth.credentials._id;
  const id = req.params.id;
  const filter = { _id: id };
  const payload = { ...req.payload, updatorId };
  try {
    return await User.find({ userName: req?.payload?.userName }).then(() => {
      if (data)
        return res
          .response({
            message: "Username already taken.",
          })
          .code(409);
      else User.findOneAndUpdate(filter, payload);

      return res.response({ message: "success" }).code(200);
    });
  } catch (err) {
    res.response({ message: "error" }).code(500);
  }
};

internals.changePassword = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.payload.newPassword, 10);
  const id = req.params.id;
  const filter = { _id: id };
  const payload = { password: hashedPassword };
  try {
    return await User.findOne({ filter }).then(async (data) => {
      let validPass = await bcrypt.compare(
        req.payload.oldPassword,
        data.password
      );
      if (!validPass)
        return res
          .response({
            message: "Old password does not match.",
          })
          .code(409);
      else User.findOneAndUpdate(filter, payload);
      return res.response({ message: "success" }).code(200);
    });
  } catch (err) {
    res.response({ message: "error" }).code(500);
  }
};
internals.adminPasswordChange = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.payload.newPassword, 10);
  const id = req.params.id;
  const filter = { _id: id };
  const payload = { password: hashedPassword };
  try {
    await User.findOneAndUpdate(filter, payload);
    return res.response({ message: "success" }).code(200);
  } catch (err) {
    res.response({ message: "error" }).code(500);
  }
};
module.exports = internals;
