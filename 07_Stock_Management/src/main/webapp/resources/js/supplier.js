const API_BASE_URL = 'https://d070-103-55-91-195.ngrok-free.app/supplier';

// Function to add a new supplier record
async function AddSupplier() {
    const name = document.getElementById("name").value.trim();
    const contact_info = document.getElementById("contact_info").value.trim();

    if (!name || !contact_info) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/createSupplier`, {
            method: 'POST',
			    headers: {
			        'Content-Type': 'application/json',
			        'ngrok-skip-browser-warning': true  // To skip ngrok browser warnings
			    },
			    body: JSON.stringify({ name, contactInfo : contact_info }) // Send category data as JSON
			});


        if (!response.ok) throw new Error('Failed to add supplier record');

        alert("Supplier record successfully added.");
        clearForm();
        //await getAllSupplier(); // Refresh data after adding
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to add the supplier record. Please try again.");
    }
}

// Function to update a supplier record
async function updateSupplier(row) {
    const id = parseInt(row.querySelector(".id-field").value);
    const name = row.querySelector(".name-field").value.trim();
    const contact_info = row.querySelector(".contact-info-field").value.trim();

    if (!name || !contact_info) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    // Prepare the updated data
    const updatedRecord = { id, name: name, contactInfo : contact_info };
    console.log("Updated Record:", updatedRecord); // Log updated record for debugging

    try {
        const response = await fetch(`https://d070-103-55-91-195.ngrok-free.app/supplier/updateSupplier`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            },
            body: JSON.stringify(updatedRecord)
        });

        if (response.ok) {
            const data = await response.json();
			console.log("Updated Value", data);

            if (data.status === 1) {  // Assuming 1 indicates success in your API
                alert("Supplier record successfully updated.");
                await getAllSupplier();  // Refresh data after updating
            } else {
                alert(`Failed to update the supplier record: ${data.message}`);
            }
        } else {
            // Handle server error responses
            const errorData = await response.json();  // Try to get the error message from the response
            alert(`Failed to update the supplier record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred while updating the supplier record:", error);
        alert("Failed to update the supplier record. Please try again.");
    }
}






// Function to get a supplier record by ID
async function getSupplierById() {
    const id = document.getElementById("id").value.trim();

    if (!id) {
        alert("Please provide an ID.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("DataById", data);

        if (data.status === 1 && data.data) {
            displayData([data.data]);
        } else {
            alert("No record found for the provided ID.");
            displayData([]);
        }
    } catch (error) {
        console.error("Error fetching data by ID:", error);
        alert("Failed to fetch data from the API.");
    }
}

// Function to get all supplier records
async function getAllSupplier() {
    try {
        const response = await fetch(`${API_BASE_URL}/getallSupplier?pageNo=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch supplier records');
        }

        const data = await response.json();
        
        if (data.status === 1 && data.data) {
            displayData(data.data);
        } else {
            alert("No supplier records found or there was an issue with the response.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch supplier records. Please try again.");
    }
}

// Function to display supplier records
function displayData(suppliers) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; // Clear previous output

    if (!suppliers || suppliers.length === 0) {
        outputDiv.innerHTML = "<p>No suppliers found</p>";
        return;
    }

    const table = document.createElement("table");
    table.className = "w-full border border-gray-300";

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr class="bg-gray-200 border-b border-gray-300">
            <th class="p-2 border-r border-gray-300 text-center">ID</th>
            <th class="p-2 border-r border-gray-300 text-center">Name</th>
            <th class="p-2 border-r border-gray-300 text-center">Contact Info</th>
            <th class="p-2 border-gray-300 text-center">Action</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    suppliers.forEach(supplier => {
        const row = document.createElement("tr");
        row.className = "border-b border-gray-300";

        row.innerHTML = `
			<td class="p-2 border-r border-gray-300 text-center">
			    <input type="text" class="id-field w-full p-1 border-none text-center focus:ring-0" value="${supplier.id}" readonly>
			</td>
			<td class="p-2 border-r border-gray-300 text-center">
			    <input type="text" class="name-field w-full p-1 border-none text-center focus:ring-0" value="${supplier.name}" readonly>
			</td>
			<td class="p-2 border-r border-gray-300 text-center">
				<input type="text" class="contact-info-field w-full p-1 border-none text-center focus:ring-0" value="${supplier.contactInfo}" readonly>
			</td>
			<td class="p-2 text-center border-gray-300">
			    <button class="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
			            onclick="toggleEdit(this)">
			        <i class="fas fa-edit"></i>
			    </button>
			    <button class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
			            onclick="deleteRecord(${supplier.id})">
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
    const idField = row.querySelector(".id-field");
    const nameField = row.querySelector(".name-field");
    const contactInfoField = row.querySelector(".contact-info-field");

    if (button.querySelector("i").classList.contains("fa-edit")) {
        // Switch to edit mode
        idField.removeAttribute("readonly");
        nameField.removeAttribute("readonly");
        contactInfoField.removeAttribute("readonly");
        button.querySelector("i").classList.remove("fa-edit");
        button.querySelector("i").classList.add("fa-save");
        button.classList.remove("bg-yellow-500");
        button.classList.add("bg-blue-500");
        button.classList.add("hover:bg-blue-600");
        button.setAttribute("onclick", "saveSupplier(this)");
    } else {
        // Save the record
        updateSupplier(row);
        // Revert button back to edit mode
        button.querySelector("i").classList.remove("fa-save");
        button.querySelector("i").classList.add("fa-edit");
        button.classList.remove("bg-blue-500");
        button.classList.add("bg-yellow-500");
        button.classList.remove("hover:bg-blue-600");
        button.classList.add("hover:bg-yellow-600");
        button.setAttribute("onclick", "toggleEdit(this)");
        // Set fields to readonly
        idField.setAttribute("readonly", true);
        nameField.setAttribute("readonly", true);
        contactInfoField.setAttribute("readonly", true);
    }
}


// Function to save the record
function saveSupplier(button) {
    toggleEdit(button);
}

// Function to delete a supplier record
async function deleteRecord(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        });

        if (!response.ok) throw new Error('Failed to delete supplier record');

        const data = await response.json();
        if (data.status === 1) {
            alert("Supplier record successfully deleted.");
            await getAllSupplier(); // Refresh the supplier list after deleting
        } else {
            alert("Failed to delete the supplier record.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to delete the supplier record. Please try again.");
    }
}

// Function to clear form fields
function clearForm() {
    document.getElementById("name").value = '';
    document.getElementById("contact_info").value = '';
}

// Bind click events to buttons
document.getElementById("getById1").addEventListener("click", getSupplierById);
document.getElementById("getAllSupplier").addEventListener("click", getAllSupplier);

