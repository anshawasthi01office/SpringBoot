// // Sample data for sales
// let salesRecords = [
//     {
//         id: 1,
//         quantity: 10,
//         customerName: "John Doe",
//         remarks: "First purchase",
//         price: 100.00,
//         discount: 5.00,
//         address: "123 Main St",
//         mobile: "555-1234",
//         email: "john@example.com",
//         purchasedQuantity: 1
//     },
//     {
//         id: 2,
//         quantity: 5,
//         customerName: "Jane Doe",
//         remarks: "Repeat customer",
//         price: 50.00,
//         discount: 2.50,
//         address: "456 Oak Ave",
//         mobile: "555-5678",
//         email: "jane@example.com",
//         purchasedQuantity: 2
//     }
// ];
// console.log(salesRecords);

// Function to add a new sale record
async function addSale() {
    const quantity = parseFloat(document.getElementById("quantity").value);
    const customerName = document.getElementById("customerName").value;
    const remarks = document.getElementById("remarks").value;
    const price = parseFloat(document.getElementById("price").value);
    const discount = parseFloat(document.getElementById("discount").value);
    const address = document.getElementById("address").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const purchasedQuantity = parseInt(document.getElementById("purchasedQuantity").value);

    if (!customerName || isNaN(quantity) || isNaN(price) || isNaN(discount) || !address || !mobile || !email || isNaN(purchasedQuantity)) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    const newSale = {
        quantity, customerName, remarks, price, discount, address, mobile, email, purchasedQuantity
    };

    try {
        const response = await fetch('https://66d6dda7006bfbe2e64ee40a.mockapi.io/firstAPI/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSale)
        });

        if (response.ok) {
            alert("Sale record successfully added.");
            clearForm();
            getAllSales();  // Refresh the sales data
        } else {
            const errorData = await response.json();
            alert(`Failed to add the record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to add the record. Please try again.");
    }
}


// Function to update a sale record
async function updateSale(row) {
    const id = parseInt(row.querySelector(".id-field").value);
    const quantity = parseFloat(row.querySelector(".quantity-field").value);
    const customerName = row.querySelector(".customerName-field").value;
    const remarks = row.querySelector(".remarks-field").value;
    const price = parseFloat(row.querySelector(".price-field").value);
    const discount = parseFloat(row.querySelector(".discount-field").value);
    const address = row.querySelector(".address-field").value;
    const mobile = row.querySelector(".mobile-field").value;
    const email = row.querySelector(".email-field").value;
    const purchasedQuantity = parseInt(row.querySelector(".purchasedQuantity-field").value);

    if (!customerName || isNaN(quantity) || isNaN(price) || isNaN(discount) || !address || !mobile || !email || isNaN(purchasedQuantity)) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    const updatedSale = { quantity, customerName, remarks, price, discount, address, mobile, email, purchasedQuantity };

    try {
        const response = await fetch(`https://66d6dda7006bfbe2e64ee40a.mockapi.io/firstAPI/sales/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedSale)
        });

        if (response.ok) {
            alert("Sales record successfully updated.");
            getAllSales();  // Refresh the sales data
        } else {
            const errorData = await response.json();
            alert(`Failed to update the record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to update the record. Please try again.");
    }
}


// Function to get a sale record by ID
async function getSaleById() {
    const id = parseInt(document.getElementById("id").value);

    try {
        const response = await fetch(`https://66d6dda7006bfbe2e64ee40a.mockapi.io/firstAPI/sales/${id}`);
        
        if (response.ok) {
            const record = await response.json();
            displaySales([record]);  // Display the single record
        } else {
            const errorData = await response.json();
            alert(`Failed to fetch the record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to fetch the record. Please try again.");
    }
}


// Function to get all sale records
async function getAllSales() {
    try {
        const response = await fetch('https://66d6dda7006bfbe2e64ee40a.mockapi.io/firstAPI/sales');
        
        if (response.ok) {
            const data = await response.json();
            displaySales(data);  // Display all records
        } else {
            const errorData = await response.json();
            alert(`Failed to fetch records: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to fetch records. Please try again.");
    }
}


// Function to display sales data in a table with edit and delete actions
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
            <th class="p-2 border-r border-gray-300 text-center">Customer Name</th>
            <th class="p-2 border-r border-gray-300 text-center">Remarks</th>
            <th class="p-2 border-r border-gray-300 text-center">Price</th>
            <th class="p-2 border-r border-gray-300 text-center">Discount</th>
            <th class="p-2 border-r border-gray-300 text-center">Address</th>
            <th class="p-2 border-r border-gray-300 text-center">Mobile</th>
            <th class="p-2 border-r border-gray-300 text-center">Email</th>
            <th class="p-2 border-r border-gray-300 text-center">Purchased Quantity</th>
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
                <input type="text" class="customerName-field w-full p-1 border-none text-center focus:ring-0" value="${record.customerName}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="text" class="remarks-field w-full p-1 border-none text-center focus:ring-0" value="${record.remarks}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="number" step="0.01" class="price-field w-full p-1 border-none text-center focus:ring-0" value="${record.price}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="number" step="0.01" class="discount-field w-full p-1 border-none text-center focus:ring-0" value="${record.discount}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="text" class="address-field w-full p-1 border-none text-center focus:ring-0" value="${record.address}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="text" class="mobile-field w-full p-1 border-none text-center focus:ring-0" value="${record.mobile}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="email" class="email-field w-full p-1 border-none text-center focus:ring-0" value="${record.email}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="number" class="purchasedQuantity-field w-full p-1 border-none text-center focus:ring-0" value="${record.purchasedQuantity}" readonly>
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
    const fields = row.querySelectorAll(".quantity-field, .customerName-field, .remarks-field, .price-field, .discount-field, .address-field, .mobile-field, .email-field, .purchasedQuantity-field");

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

// Function to delete a sale record
async function deleteSale(id) {
    try {
        const response = await fetch(`https://66d6dda7006bfbe2e64ee40a.mockapi.io/firstAPI/sales/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Sale record successfully deleted.");
            getAllSales();  // Refresh the sales data
        } else {
            const errorData = await response.json();
            alert(`Failed to delete the record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to delete the record. Please try again.");
    }
}


// Function to clear form fields
function clearForm() {
    
    document.getElementById("customerName").value = '';
    document.getElementById("mobile").value = '';
    document.getElementById("email").value = '';
    document.getElementById("address").value = '';
    document.getElementById("quantity").value = '';
    document.getElementById("remarks").value = '';
    document.getElementById("purchasedQuantity").value = '';
    document.getElementById("price").value = '';
    document.getElementById("discount").value = '';
    
}

// Bind click events to buttons
document.getElementById("searchSaleBtn").addEventListener("click", getSaleById);
document.getElementById("viewAllSalesBtn").addEventListener("click", getAllSales);
// document.getElementById("addSaleBtn").addEventListener("click", addSale);
