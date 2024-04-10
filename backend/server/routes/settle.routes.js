const express = require("express");
const router = express.Router();
const settleController = require("../controllers/settle.controller.js");

router.get("/expense/:id", settleController.settleup);
router.post("/payment/:id", settleController.payment);

module.exports = (app) => {
  app.use("/api/stl", router);
};
