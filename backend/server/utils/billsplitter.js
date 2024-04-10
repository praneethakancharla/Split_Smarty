class Bill {
  constructor() {
    this.transactions = [];
    this.participants = new Set();
  }

  addTransaction(from, to, amount) {
    this.transactions.push({ from, to, amount });
    this.participants.add(from);
    this.participants.add(to);
  }
}

function minCashFlowRec(amount, participants, settlements) {
  const N = amount.length;
  const minInd = amount.indexOf(Math.min(...amount));
  const maxInd = amount.indexOf(Math.max(...amount));

  if (amount[minInd] === 0 && amount[maxInd] === 0) return;

  const min = Math.min(-amount[minInd], amount[maxInd]);
  amount[maxInd] -= min;
  amount[minInd] += min;

  settlements.push({
    from: participants[minInd],
    to: participants[maxInd],
    amount: min,
  });
  minCashFlowRec(amount, participants, settlements);
}

function calculateSettlements(splits) {
  const bill = new Bill();

  splits.forEach((split) => {
    if (!split.isSettled) {
      bill.addTransaction(split.from_id, split.to_id, split.amount);
    }
  });

  const participants = Array.from(bill.participants);
  const numParticipants = participants.length;
  const graph = Array.from({ length: numParticipants }, () =>
    Array(numParticipants).fill(0)
  );

  bill.transactions.forEach((transaction) => {
    const fromIndex = participants.indexOf(transaction.from);
    const toIndex = participants.indexOf(transaction.to);
    graph[fromIndex][toIndex] += transaction.amount;
    graph[toIndex][fromIndex] -= transaction.amount;
  });

  const amount = Array(numParticipants).fill(0);

  for (let p = 0; p < numParticipants; p++) {
    for (let i = 0; i < numParticipants; i++) {
      amount[p] += graph[i][p] - graph[p][i];
    }
  }

  const settlements = [];
  minCashFlowRec(amount, participants, settlements);

  return settlements;
}

module.exports = {
  calculateSettlements,
};
