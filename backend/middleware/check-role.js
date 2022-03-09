const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

const checkRole = (role) => {
  return (req, res, next) => {
    // browser sends OPTIONS request before sending actual request
    if (req.method === "OPTIONS") {
      return next();
    }

    if (req.userData.role !== role) {
      const error = new HttpError("Unauthorized", 401);
      return next(error);
    }

    next();
  };
};

exports.checkRole = checkRole;
