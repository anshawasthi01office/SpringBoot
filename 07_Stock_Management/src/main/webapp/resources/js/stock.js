// Base URL for the API
const API_BASE_URL = 'https://66d701ce006bfbe2e64f7018.mockapi.io/firstAPI/stock';

// Function to add a new stock record
async function addStock() {
    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseFloat(document.getElementById("quantity").value);
    const description = document.getElementById("description").value.trim();

    if (!name || isNaN(quantity) || isNaN(price) || !description) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, quantity, description })
        });

        if (!response.ok) throw new Error('Failed to add stock record');

        alert("Stock record successfully added.");
        clearForm();
        // await getAllStock(); // Refresh data after adding
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to add the stock record. Please try again.");
    }
}

// Function to update a stock record
async function updateSale(row) {
    const id = parseInt(row.querySelector(".id-field").value);
    const name = row.querySelector(".name-field").value.trim();
    const price = parseFloat(row.querySelector(".price-field").value);
    const quantity = parseFloat(row.querySelector(".quantity-field").value);
    const description = row.querySelector(".description-field").value.trim();

    if (!name || isNaN(quantity) || isNaN(price) || !description) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, quantity, description })
        });

        if (!response.ok) throw new Error('Failed to update stock record');

        alert("Stock record successfully updated.");
        await getAllStock(); // Refresh data after updating
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to update the stock record. Please try again.");
    }
}

// Function to get a stock record by ID
async function getSaleById() {
    const id = parseInt(document.getElementById("id").value.trim());

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch stock record');

        const record = await response.json();
        displaySales(record ? [record] : []);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch stock record. Please try again.");
    }
}

// Function to get all stock records
async function getAllStock() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch stock records');

        const records = await response.json();
        displaySales(records);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch stock records. Please try again.");
    }
}

// Function to display stock data in a table with edit and delete actions
function displaySales(data) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";  // Clear previous output

    if (data.length === 0) {
        outputDiv.innerHTML = "<p>No records found</p>";
        return;
    }

    // Create table with full width and border
    const table = document.createElement("table");
    table.className = "w-full border border-gray-300";  // Apply border to table

    const thead = document.createElement("thead");
    thead.className = "";
    thead.innerHTML = `
        <tr class="bg-gray-200 border-b border-gray-300">
            <th class="p-2 border-r border-gray-300 text-center">ID</th>
            <th class="p-2 border-r border-gray-300 text-center">Quantity</th>
            <th class="p-2 border-r border-gray-300 text-center">Name</th>
            <th class="p-2 border-r border-gray-300 text-center">Description</th>
            <th class="p-2 border-r border-gray-300 text-center">Price</th>
            <th class="p-2 border-gray-300 text-center">Action</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.forEach(record => {
        const row = document.createElement("tr");
        row.className = "border-b border-gray-300";  // Apply border to row

        row.innerHTML = `
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="text" class="id-field w-full p-1 border-none text-center focus:ring-0" value="${record.id}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="number" class="quantity-field w-full p-1 border-none text-center focus:ring-0" value="${record.quantity}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="text" class="name-field w-full p-1 border-none text-center focus:ring-0" value="${record.name}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="text" class="description-field w-full p-1 border-none text-center focus:ring-0" value="${record.description}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="number" step="0.01" class="price-field w-full p-1 border-none text-center focus:ring-0" value="${record.price}" readonly>
            </td>

            <td class="p-2 text-center border-gray-300">
                <button class="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                        onclick="toggleEdit(this)">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                        onclick="deleteSale(${record.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    outputDiv.appendChild(table);
}

// Function to toggle edit mode
function toggleEdit(button) {
    const row = button.parentElement.parentElement;
    const fields = row.querySelectorAll(".quantity-field, .name-field, .description-field, .price-field");

    if (button.querySelector("i").classList.contains("fa-edit")) {
        // Switch to edit mode
        fields.forEach(field => field.removeAttribute("readonly"));
        button.querySelector("i").classList.remove("fa-edit");
        button.querySelector("i").classList.add("fa-save");
        button.classList.remove("bg-yellow-500");
        button.classList.add("bg-blue-500");
        button.classList.add("hover:bg-blue-600");
        button.setAttribute("onclick", "saveSale(this)");
    } else {
        // Save the record
        updateSale(row);
        // Revert button back to edit mode
        button.querySelector("i").classList.remove("fa-save");
        button.querySelector("i").classList.add("fa-edit");
        button.classList.remove("bg-blue-500");
        button.classList.add("bg-yellow-500");
        button.classList.remove("hover:bg-blue-600");
        button.classList.add("hover:bg-yellow-600");
        button.setAttribute("onclick", "toggleEdit(this)");
        // Set fields to readonly
        fields.forEach(field => field.setAttribute("readonly", true));
    }
}

// Function to save the record
function saveSale(button) {
    toggleEdit(button);
}

// Function to delete a stock record
async function deleteSale(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });

        if (!response.ok) throw new Error('Failed to delete stock record');

        alert("Stock record successfully deleted.");
        await getAllStock(); // Refresh data after deleting
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to delete the stock record. Please try again.");
    }
}

// Function to clear form fields
function clearForm() {
    document.getElementById("name").value = '';
    document.getElementById("quantity").value = '';
    document.getElementById("description").value = '';
    document.getElementById("price").value = '';
}

// Bind click events to buttons
document.getElementById("searchSaleBtn").addEventListener("click", getSaleById);
document.getElementById("viewAllSalesBtn").addEventListener("click", getAllStock);
