const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

const checkAuth = (req, res, next) => {
  // browser sends OPTIONS request before sending actual request
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: "Bearer TOKEN"
    if (!token) {
      throw new Error("Authentication Failed");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {
      userId: decodedToken.userId,
      email: decodedToken.email,
      role: decodedToken.role,
    };
    next();
  } catch (err) {
    const error = new HttpError("Authentication Failed", 401);
    return next(error);
  }
};

exports.checkAuth = checkAuth;
