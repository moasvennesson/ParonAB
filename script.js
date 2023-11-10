// Initialize data structure to store cumulative quantities
var stockData = {};

function submitOrder() {
  var item = document.getElementById('item').value;
  var storage = document.getElementById('storage').value;
  var action = document.getElementById('action').value;
  var quantity = parseInt(document.getElementById('quantity').value);

  // Check if the order already exists in the data structure
  if (!stockData[item]) {
    stockData[item] = {};
  }

  if (!stockData[item][storage]) {
    stockData[item][storage] = 0;
  }

  // Update the cumulative quantity based on the action
  if (action === 'in') {
    stockData[item][storage] += quantity;
  } else if (action === 'out') {
    stockData[item][storage] -= quantity;
  }

  // Update the table
  updateTable();

  // Update recent transactions
  updateTransactions(item, storage, action, quantity);

  // Reset form values
  document.getElementById('item').value = '';
  document.getElementById('storage').value = '';
  document.getElementById('action').value = '';
  document.getElementById('quantity').value = '';
}

function updateTable() {
  var tableBody = document.getElementById('orderTableBody');

  // Clear existing rows
  tableBody.innerHTML = '';

  // Add a row for each item
  for (var item in stockData) {
    var newRow = tableBody.insertRow();
    var cellItem = newRow.insertCell(0);
    cellItem.innerHTML = item;

    // Add a cell for each storage site
    for (var storage in stockData[item]) {
      var cellStorage = newRow.insertCell();
      cellStorage.innerHTML = stockData[item][storage];
    }
  }
}

function updateTransactions(item, storage, action, quantity) {
  var transactionList = document.getElementById('transactionList');
  var listItem = document.createElement('li');

  listItem.innerHTML = `${action.toUpperCase()} - ${quantity} ${item} at ${storage} (${new Date().toLocaleString()})`;
  transactionList.prepend(listItem);
}

document.addEventListener('DOMContentLoaded', function () {
    // Set the initial value for the disabled input
    document.getElementById('quantity').value = 1;
});