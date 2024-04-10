const { Op } = require("sequelize");
const {
  Expense: _Expense,
  User,
  GroupExpense,
  SplitGroup,
  Split,
} = require("../models");
const Expense = _Expense;

async function addExpense(req, res) {
  try {
    const { amount, type, splitAmount } = req.body;
    console.log(req.body);
    const groupId = req.params.groupid;
    const payerId = req.params.payerid;
    console.log(amount);
    console.log(type);
    console.log(splitAmount);
    console.log(groupId);
    console.log(payerId);

    const expense_id = Math.floor(Math.random() * 1000000);
    const date_time = new Date().toISOString();
    console.log(expense_id);

    const newExpense = await GroupExpense.create({
      group_id: groupId,
      expense_id: expense_id,
    });
    console.log(
      "====================================================================Created newGroupExpense============================================"
    );
    await Expense.create({
      expense_id: expense_id,
      payer_id: payerId,
      date_time: date_time,
      amount: amount,
      type: type,
    });
    console.log(
      "====================================================================Created newExpense============================================"
    );
    const userIds = Object.keys(splitAmount);
    console.log(userIds);
    for (const userId of userIds) {
      const amount = splitAmount[userId];
      console.log(amount);
      if (amount != 0 && userId != payerId) {
        await Split.create({
          expense_id: expense_id,
          share_expense: parseInt(amount),
          to_id: parseInt(payerId),
          from_id: parseInt(userId),
        });
      }
    }

    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error adding split:", error);
    res.status(500).json({ error: "Failed to add split to group." });
  }
}

async function deleteExpense(req, res) {
  try {
    const expenseId = req.params.id;

    const groupExpense = await GroupExpense.findOne({
      where: { expense_id: expenseId },
    });
    if (!groupExpense) {
      return res.status(404).json({ error: "Expense not found in group." });
    }
    await Expense.destroy({ where: { expense_id: expenseId } });

    const split = await Split.findAll({
      where: { expense_id: expenseId },
    });

    for (const splits in split) {
      await Split.destroy({ where: { expense_id: expenseId } });
    }

    await GroupExpense.destroy({ where: { expense_id: expenseId } });

    res.status(200).json({ message: "Successfully deleted the expense." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense." });
  }
}

async function getGroupExpense(req, res) {
  try {
    const groupId = req.params.id;
    const expenses = await GroupExpense.findAll({
      where: {
        group_id: groupId,
      },
    });
    const expenseIds = expenses.map((expense) => expense.expense_id);
    const listExpense = [];
    for (const expenseId of expenseIds) {
      const expenseInfo = await Expense.findOne({
        where: {
          expense_id: expenseId,
        },
      });
      listExpense.push(expenseInfo);
    }
    res.status(200).json(listExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to get expense information." });
  }
}

module.exports = { addExpense, deleteExpense, getGroupExpense };
