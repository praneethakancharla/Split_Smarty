const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/createUser", userController.createUser);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);
router.get("/getUserbyId/:id", userController.getUserById);
router.get("/getUserId", userController.getUserId);

module.exports = function (app) {
  app.use("/api/users", router);
};
