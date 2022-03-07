const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const userController = require("../controller/user-controller");

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.post("/add", [check("email").not().isEmpty()], userController.addUser);

router.post("/login", userController.login);

router.patch(
  "/:id",
  [
    check("email").not().isEmpty(),
    check("approved").not().isEmpty(),
    check("role").not().isEmpty(),
  ],
  userController.updateUser
);

router.delete("/:id", userController.deleteUser);

module.exports = router;
