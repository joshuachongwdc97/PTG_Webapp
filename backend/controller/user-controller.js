const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const request = require("request");
const exec = require("child_process").execFile;
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const privateKey = require("../constants").privateKey;

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({});
  } catch (err) {
    const error = new HttpError("User Fetching Failed", 500);
    return next(error);
  }

  res.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const getUser = async (req, res, next) => {
  const id = req.params.id;

  let user;

  try {
    user = await User.findById(id);
  } catch (err) {
    const error = new HttpError("User Fetching Failed", 500);
    return next(error);
  }

  if (user) {
    res.json({
      user: user.toObject({ getters: true }),
    });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
};

const addUser = async (req, res, next) => {
  const { email, role, approved } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("User Adding Failed", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User Already Exists", 422);
    return next(error);
  }

  const createdDate = new Date().toLocaleString("default");
  const createdUser = new User({
    email,
    role: role ? role : "basic",
    approved: approved ? approved : false,
    createdDate,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdUser.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating User Failed", 500);
    return next(error);
  }

  res.status(201).json({
    user: createdUser.toObject({ getters: true }),
  });
};

const updateUser = async (req, res, next) => {
  const { email, role, approved } = req.body;
  const id = req.params.id;

  let updatedUser;
  try {
    updatedUser = await User.findById(id);
  } catch (err) {
    const error = new HttpError("User retrieving failed", 500);
    return next(error);
  }

  updatedUser.email = email;
  updatedUser.role = role;
  updatedUser.approved = approved;

  try {
    await updatedUser.save();
  } catch (err) {
    const error = new HttpError("Updating User Failed", 500);
    return next(error);
  }

  res.status(200).json({
    user: updatedUser.toObject({ getters: true }),
  });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let user;

  try {
    user = await User.findById(id);
  } catch (err) {
    const error = new HttpError("Retrieving User Failed", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find User for this ID", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.remove({ session: sess });
    await sess.commitTransaction();

    // await place.remove();
  } catch (err) {
    const error = new HttpError("Deleting User Failed", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted User" });
};

const userRequest = async (req, res, next) => {
  const { email } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("User Adding Failed", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User Already Exists", 422);
    return next(error);
  }

  const createdDate = new Date().toLocaleString("default");
  const createdUser = new User({
    email,
    role: "basic",
    approved: false,
    createdDate,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdUser.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating User Failed", 500);
    return next(error);
  }

  res.status(201).json({
    user: createdUser.toObject({ getters: true }),
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Retrieving User Failed", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User Does Not Exists", 401);
    return next(error);
  } else if (!user.approved) {
    const error = new HttpError("User Not Approved", 401);
    return next(error);
  }

  // EncryptPassword.exe is a compiled C# program provided in WD confluence
  // https://confluence.wdc.com/pages/viewpage.action?spaceKey=SWT&title=Single+Sign-On+Service+from+SWT
  exec("EncryptPassword.exe", [password], (err, data) => {
    if (err) {
      return next(err);
    }

    const xml =
      "<EmployeeDetails><Name>" +
      email +
      "</Name><Pw>" +
      data +
      "</Pw><domain>''</domain></EmployeeDetails>";

    request.post(
      {
        url: "http://10.177.12.24/EmployeeSSOService/EmployeeInfo.svc/ValidateUser",
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: xml,
      },
      (err, response, body) => {
        if (err) {
          return next(err);
        }

        if (body.includes("true")) {
          let token;
          try {
            // private key can be changed to any string
            token = jwt.sign(
              { userId: user.id, email: user.email, role: user.role },
              privateKey,
              // expiry duration has to be set here and in the frontend's auth-hook
              { expiresIn: "1h" }
            );
          } catch (err) {
            const error = new HttpError("Token Generation Failed", 228);
            return next(err);
          }

          res.status(200).json({
            userId: user.id,
            email: user.email,
            role: user.role,
            token: token,
          });
        } else {
          res.status(401).json({ message: "Login Failed" });
        }
      }
    );
  });
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.userRequest = userRequest;
exports.login = login;
