const express = require("express");
const router = express.Router();
const moneyController = require("../controllers/money.controller.js");

router.post("/groups/:groupid/expenses/:payerid", moneyController.addExpense);
router.delete("/expense/:id", moneyController.deleteExpense);
router.get("/group/:id", moneyController.getGroupExpense);

module.exports = (app) => {
  app.use("/api/exp", router);
};
