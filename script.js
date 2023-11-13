// Initialize data structure to store cumulative quantities
var stockData = {
  'jTelefon': {
    'storage1': 50,  // Initial value for storage1
    'storage2': 30,  // Initial value for storage2
    'storage3': 40   // Initial value for storage3
  },
  'jPlatta': {
    'storage1': 20,
    'storage2': 10,
    'storage3': 15
  },
  'Päronklocka': {
    'storage1': 35,
    'storage2': 25,
    'storage3': 20
  }
};

// Update the table with the initial values
updateTable();

function submitOrder() {
    var item = document.getElementById('item').value;
    var storage = document.getElementById('storage').value;
    var action = document.querySelector('input[name="action"]:checked');
    var quantity = parseInt(document.getElementById('quantity').value);
  
    // Validate inputs
    if (!item || !storage || !action || isNaN(quantity) || quantity < 0) {
      alert('Please fill in all fields and enter a valid quantity.');
      return;
    }
  
    action = action.value; // Get the value of the checked radio button
  
    // Initialize data structure if not already present
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
    document.getElementById('quantity').value = '';
  
    //Provide user feedback (you can customize this part)
    displayTimedAlert('Order submitted successfully!', 3000); 
  }
  
  function displayTimedAlert(message, duration) {
    var alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success'; 
  
    alertDiv.innerHTML = message;
  
    // Prepend the alert to the body (insertBefore is used to prepend)
    document.body.insertBefore(alertDiv, document.body.firstChild);
  
    // Set a timeout to remove the alert after the specified duration
    setTimeout(function () {
      alertDiv.remove();
    }, duration);
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
  
      // Initialize cells for each storage site
      var storageCells = {
        'storage1': newRow.insertCell(1),
        'storage2': newRow.insertCell(2),
        'storage3': newRow.insertCell(3)
      };
  
      // Set initial values to 0 for each storage site
      for (var storage in storageCells) {
        storageCells[storage].innerHTML = '0';
      }
  
      // Update the cell for the specific storage site
      for (var storage in stockData[item]) {
        storageCells[storage].innerHTML = stockData[item][storage];
      }
    }
  }
  

// Add an event listener to the toggleTransactions link
document.getElementById('toggleTransactions').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default behavior of the link
  toggleTransactionList();
});

function toggleTransactionList() {
  var transactionList = document.getElementById('transactionList');
  var toggleLink = document.getElementById('toggleTransactions');

  // Toggle the display property of the transaction list
  transactionList.style.display = (transactionList.style.display === 'none' || transactionList.style.display === '') ? 'block' : 'none';

  // Change the text of the toggle link based on the current state
  toggleLink.innerText = (transactionList.style.display === 'none' || transactionList.style.display === '') ? 'Click here to view' : 'Click here to hide';
}


function updateTransactions(item, storage, action, quantity) {
  var transactionList = document.getElementById('transactionList');
  var listItem = document.createElement('li');

  listItem.innerHTML = `${action.toUpperCase()} - ${quantity} ${item} at ${storage} (${new Date().toLocaleString()})`;
  transactionList.prepend(listItem);
}