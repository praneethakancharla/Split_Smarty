const { Op } = require("sequelize");
const {
  Expense: _Expense,
  User,
  GroupExpense,
  SplitGroup,
  Split,
} = require("../models");
const Expense = _Expense;

async function settleup(req, res) {
  try {
    const groupId = req.params.id;
    const expense = await GroupExpense.findAll({
      where: { group_id: groupId },
    });
    const expenseIds = [];
    for (const expenses of expense) {
      expenseIds.push(expenses.expense_id);
    }
    console.log(expenseIds);

    const listSettle = [];

    for (const expenseId of expenseIds) {
      const splitExpenses = await Split.findAll({
        where: { isSettled: 0, expense_id: expenseId },
      });
      splitExpenses.forEach((splitExpense) => {
        listSettle.push({
          from_id: parseInt(splitExpense.from_id),
          to_id: parseInt(splitExpense.to_id),
          share_expense: parseInt(splitExpense.share_expense),
        });
      });
    }

    const uniquePersons = new Set();
    listSettle.forEach((expense) => {
      uniquePersons.add(expense.from_id);
      uniquePersons.add(expense.to_id);
    });

    const personIds = Array.from(uniquePersons);
    const N = personIds.length;

    const graph = Array.from({ length: N }, () =>
      Array.from({ length: N }, () => 0)
    );

    listSettle.forEach((expense) => {
      const fromIndex = personIds.indexOf(expense.from_id);
      const toIndex = personIds.indexOf(expense.to_id);
      graph[fromIndex][toIndex] += expense.share_expense;
    });

    const settle = [];

    for (const expenseId of expenseIds) {
      await Split.destroy({ where: { isSettled: 0, expense_id: expenseId } });
    }

    function minCashFlow(graph) {
      var amount = Array.from({ length: N }, (_, i) => 0);
      for (p = 0; p < N; p++)
        for (i = 0; i < N; i++) amount[p] += graph[i][p] - graph[p][i];

      minCashFlowRec(amount);
    }

    function minCashFlowRec(amount) {
      var mxCredit = getMax(amount),
        mxDebit = getMin(amount);
      if (amount[mxCredit] == 0 && amount[mxDebit] == 0) return;
      var min = minOf2(-amount[mxDebit], amount[mxCredit]);
      amount[mxCredit] -= min;
      amount[mxDebit] += min;

      const expense_id = Math.floor(Math.random() * 1000000);
      const DateTime = new Date();

      GroupExpense.create({
        group_id: groupId,
        expense_id: expense_id,
      });

      Expense.create({
        expense_id: expense_id,
        payer_id: parseInt(personIds[mxCredit]),
        date_time: DateTime,
        amount: min,
        type: "split",
      });

      Split.create({
        expense_id: expense_id,
        share_expense: min,
        from_id: personIds[mxDebit],
        to_id: personIds[mxCredit],
        isSettled: 0,
      });

      const x = [personIds[mxDebit], personIds[mxCredit], min, expense_id];
      settle.push(x);
      minCashFlowRec(amount);
    }

    function getMax(arr) {
      var maxInd = 0;
      for (i = 1; i < N; i++) if (arr[i] > arr[maxInd]) maxInd = i;
      return maxInd;
    }

    function getMin(arr) {
      var minInd = 0;
      for (i = 1; i < N; i++) if (arr[i] < arr[minInd]) minInd = i;
      return minInd;
    }

    function minOf2(x, y) {
      return x < y ? x : y;
    }

    minCashFlow(graph);

    res.status(200).json(settle);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed" });
  }
}

async function payment(req, res, next) {
  try {
    const expenseId = req.params.id;
    await Split.update({ isSettled: 1 }, { where: { expense_id: expenseId } });
    res.status(200).json({ message: "Successful payment." });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed" });
  }
}

module.exports = { settleup, payment };
