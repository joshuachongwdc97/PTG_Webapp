const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const userController = require("../controller/user-controller");
const checkAuth = require("../middleware/check-auth").checkAuth;
const checkRole = require("../middleware/check-role").checkRole;

router.post("/login", userController.login);

router.post("/request", userController.userRequest);

router.use(checkAuth);

// can be applied to specific routes, e.g, router.get("/", checkRole("admin"), userController.getUsers);
router.use(checkRole("admin"));

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.post("/add", [check("email").not().isEmpty()], userController.addUser);

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
