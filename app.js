function goHome() {
    window.location.href = "./index.html";
}
function goToCompleted(){
    window.location.href = "./completed.html";
}


 // Function to get items from localStorage
 function getItems() {
    let items = localStorage.getItem('items');
    return items ? JSON.parse(items) : [];
}

// Function to get completed items from localStorage
function getCompletedItems() {
    let completedItems = localStorage.getItem('completedItems');
    return completedItems ? JSON.parse(completedItems) : [];
}

// Function to save items to localStorage
function saveItems(items) {
    localStorage.setItem('items', JSON.stringify(items));
}

// Function to save completed items to localStorage
function saveCompletedItems(completedItems) {
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
}

// Function to render items in the pending items table
function renderItems() {
    let items = getItems();
    let itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    items.forEach((item, index) => {
        let row = `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${item}</td>
            <td>
                <button class="btn btn-outline-success btn-sm" onclick="completeItem(${index})"><i class="bi bi-check"></i></button>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteItem(${index})"><i class="bi bi-x"></i></button>
            </td>
        </tr>`;
        itemList.innerHTML += row;
    });
}

// Function to render completed items in the completed items table
function renderCompletedItems() {
    let completedItems = getCompletedItems();
    let completedItemList = document.getElementById('completedItemList');
    completedItemList.innerHTML = '';

    completedItems.forEach((item, index) => {
        let row = `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${item}</td>
        </tr>`;
        completedItemList.innerHTML += row;
    });
}

// Function to add a new item
document.getElementById('addButton').addEventListener('click', function() {
    let itemInput = document.getElementById('itemInput');
    let newItem = itemInput.value.trim();

    if (newItem !== '') {
        let items = getItems();
        items.push(newItem);
        saveItems(items);
        renderItems();
        itemInput.value = '';  // Clear the input field
    }
});

// Function to delete an item from the pending list
function deleteItem(index) {
    let items = getItems();
    items.splice(index, 1);
    saveItems(items);
    renderItems();
}

// Function to move an item to the completed list
function completeItem(index) {
    let items = getItems();
    let completedItems = getCompletedItems();

    // Remove the item from the pending list and add to the completed list
    let completedItem = items.splice(index, 1)[0];
    completedItems.push(completedItem);

    // Save updated arrays to localStorage
    saveItems(items);
    saveCompletedItems(completedItems);

    // Re-render both tables
    renderItems();
    renderCompletedItems();
}

// Initial rendering of items
renderItems();
renderCompletedItems();
