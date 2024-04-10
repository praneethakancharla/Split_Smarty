var N = 3;
function getMin(arr) {
  var minInd = 0;
  for (i = 1; i < N; i++) if (arr[i] < arr[minInd]) minInd = i;
  return minInd;
}

function getMax(arr) {
  var maxInd = 0;
  for (i = 1; i < N; i++) if (arr[i] > arr[maxInd]) maxInd = i;
  return maxInd;
}

function minOf2(x, y) {
  return x < y ? x : y;
}

function minCashFlowRec(amount) {
  var mxCredit = getMax(amount),
    mxDebit = getMin(amount);
  if (amount[mxCredit] == 0 && amount[mxDebit] == 0) return;
  var min = minOf2(-amount[mxDebit], amount[mxCredit]);
  amount[mxCredit] -= min;
  amount[mxDebit] += min;

  document.write(
    "<br>Person " + mxDebit + " pays " + min + " to " + "Person " + mxCredit
  );
  minCashFlowRec(amount);
}

function minCashFlow(graph) {
  var amount = Array.from({ length: N }, (_, i) => 0);
  for (p = 0; p < N; p++)
    for (i = 0; i < N; i++) amount[p] += graph[i][p] - graph[p][i];

  minCashFlowRec(amount);
}

//person 0 paid 1000 to 1 and 2000 to 2
//person 1 paid 5000 to 2
//person 2 doesn't to pay anything
var graph = [
  [0, 1000, 2000],
  [0, 0, 5000],
  [0, 0, 0],
];
minCashFlow(graph);
