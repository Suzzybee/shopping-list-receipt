  // Function to add an item to the shopping list
function addItem() {
    let name = document.getElementById('item-name').value;
    let quantity = Number(document.getElementById('item-quantity').value);
    let price = Number(document.getElementById('item-price').value);
 
    if (!name || isNaN(quantity) || isNaN(price)) {
        alert('Please enter valid item details.');
        return;
    }

    let item = { name, quantity, price };
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    shoppingList.push(item);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

    updateReceipt();
}

// Function to update the shopping receipt
function updateReceipt() {
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    let totalElement = document.getElementById('total');
    let shoppingListElement = document.getElementById('shopping-list');

    let total = 0;

    shoppingListElement.innerHTML = '';
    shoppingList.forEach((item, index) => {
        let listItem = document.createElement('li');
        let itemTotal = item.quantity * item.price;
      listItem.innerHTML = 

      `<strong>Item:</strong> ${item.name}  <strong class="ms-4 ">Quantity:</strong> ${item.quantity}  <strong class="ms-4 ">Price:</strong> ₦${itemTotal.toFixed(2)} 
          <button onclick="editItem(${index})" class="btn btn-dark ms-5 me-5 mb-2">Edit</button> 
          <button onclick="deleteItem(${index})" class="btn btn-danger">Delete</button><input onclick="addItemList()" style="        width: 13px; box-shadow:none; " type="checkbox" class="ms-4">
          `;
        shoppingListElement.appendChild(listItem);
        total += itemTotal;
    });

    totalElement.textContent = total.toFixed(2);
}
function addItemList(){
    
}
// Function to edit an item
function editItem(index) {
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    let item = shoppingList[index];
    if (!item) return;

    let newName = prompt('Edit item name:', item.name);
    let newQuantity = Number(prompt('Edit item quantity:', item.quantity));
    let newPrice = Number(prompt('Edit item price:', item.price));

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
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    shoppingList.splice(index, 1);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    updateReceipt();
}

// Initial update
updateReceipt();
