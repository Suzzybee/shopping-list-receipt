  // Function to add an item to the shopping list
function addItem() {
    const name = document.getElementById('item-name').value;
    const quantity = parseInt(document.getElementById('item-quantity').value);
    const price = parseFloat(document.getElementById('item-price').value);

    if (!name || isNaN(quantity) || isNaN(price)) {
        alert('Please enter valid item details.');
        return;
    }

    const item = { name, quantity, price };
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    shoppingList.push(item);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

    updateReceipt();
}

// Function to update the shopping receipt
function updateReceipt() {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const totalElement = document.getElementById('total');
    const shoppingListElement = document.getElementById('shopping-list');

    let total = 0;

    shoppingListElement.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        const itemTotal = item.quantity * item.price;
      listItem.innerHTML = `<strong>Item:</strong> ${item.name} | <strong class="ms-4 ">Quantity:</strong> ${item.quantity} | <strong class="ms-4 ">Price:</strong> ₦${itemTotal.toFixed(2)} 
          <button onclick="editItem(${index})" class="btn btn-dark ms-5 me-5 mb-2">Edit</button> 
          <button onclick="deleteItem(${index})" class="btn btn-danger">Delete</button>`;
        shoppingListElement.appendChild(listItem);
        total += itemTotal;
    });

    totalElement.textContent = total.toFixed(2);
}

// Function to edit an item
function editItem(index) {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const item = shoppingList[index];
    if (!item) return;

    const newName = prompt('Edit item name:', item.name);
    const newQuantity = parseInt(prompt('Edit item quantity:', item.quantity));
    const newPrice = parseFloat(prompt('Edit item price:', item.price));

    if (!newName || isNaN(newQuantity) || isNaN(newPrice)) {
        alert('Invalid input. Item not updated.');
        return;
    }

    item.name = newName;
    item.quantity = newQuantity;
    item.price = newPrice;
    shoppingList[index] = item;
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

    updateReceipt();
}

// Function to delete an item
function deleteItem(index) {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    shoppingList.splice(index, 1);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    updateReceipt();
}

// Initial update
updateReceipt();
