// Give inital values to the stockData
var stockData = {
  'jTelefon': {
    'storage1': 50,  
    'storage2': 30,  
    'storage3': 40   
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

// Update the table with the initial values at start
updateTable();

function submitOrder() {
    var item = document.getElementById('item').value;
    var storage = document.getElementById('storage').value;
    var action = document.querySelector('input[name="action"]:checked');
    var quantity = parseInt(document.getElementById('quantity').value);
    //get all the form values
  
    // Validate inputs
    if (!item || !storage || !action || isNaN(quantity) || quantity < 0) {
      alert('Vänligen fyll i alla fält korrekt');
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
  
    // Update the in/out choice from user, adding when in substaticting when out
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
  
    //User feedback 
    displayTimedAlert('Varan är tillagd i lager!', 3000); 
  }
  
  function displayTimedAlert(message, duration) {
    var alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success'; //green success
  
    alertDiv.innerHTML = message; //from user feedback
  
    // Position and other styles
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px'; 
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translateX(-50%)'; // Center horizontally
  
    // Prepend the alert to the body (insertBefore is used to prepend)
    document.body.insertBefore(alertDiv, document.body.firstChild);
  
    // Timeout to remove the alert after the specified duration
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
  
      // Set initial values to 0 for each storage site to avoid valus like undefined 
      for (var storage in storageCells) {
        storageCells[storage].innerHTML = '0';
      }
  
      // Update the cell for the specific storage site based on stockData
      for (var storage in stockData[item]) {
        storageCells[storage].innerHTML = stockData[item][storage];
      }
    }
  }
  

// Add an event listener to the toggleTransactions link
document.getElementById('toggleTransactions').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default behavior of the link (not navigate to the URL specified in the href attribute)
  toggleTransactionList();
});

function toggleTransactionList() {
  var transactionList = document.getElementById('transactionList');
  var toggleLink = document.getElementById('toggleTransactions');

  // Toggle the display property of the transaction list
  transactionList.style.display = (transactionList.style.display === 'none' || transactionList.style.display === '') ? 'block' : 'none';

  // Change the text of the toggle link based on the current state
  toggleLink.innerText = (transactionList.style.display === 'none' || transactionList.style.display === '') ? 'Klicka här för att visa' : 'Klicka här för att dölja';
}


function updateTransactions(item, storage, action, quantity) {
  var transactionList = document.getElementById('transactionList');
  var listItem = document.createElement('li');

  // Create a span element to wrap the content with a background color
  var actionSpan = document.createElement('span');
  
  // Set the background color based on the action
  actionSpan.style.backgroundColor = (action === 'in') ? 'green' : 'red';
  actionSpan.style.padding = '1px';
  actionSpan.style.borderRadius = '4px';
  actionSpan.style.marginRight = '8px';
  actionSpan.style.color = 'white';

  // Set the text content of the span
  actionSpan.innerText = action.toUpperCase();

  // Append the action span to the list item
  listItem.appendChild(actionSpan);

  // Add the rest of the content to the list item
  listItem.innerHTML += `${quantity} ${item} at ${storage} (${new Date().toLocaleString()})`;

  // Prepend the styled list item to the transaction list
  transactionList.prepend(listItem);
}
