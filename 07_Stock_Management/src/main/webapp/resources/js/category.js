


let records = []

console.log(records);

async function AddCategory() {
    const category = document.getElementById("category").value;

    if (!category) {
        alert("Please provide a Category.");
        return;
    }

    try {
        const response = await fetch('https://27ca-103-55-91-195.ngrok-free.app/category/createCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true  // To skip ngrok browser warnings
            },
            body: JSON.stringify({ name: category }) // Send category data as JSON
        });

        if (!response.ok) {
            throw new Error('Failed to add category');
        }

        const data = await response.json(); // Get the response from the server

        if (data.status === 1) {
            alert("Record successfully registered.");
            document.getElementById("category").value = '';
        } else {
            alert(`Failed to register the record: ${data.message}`);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Failed to register the record. Please try again.");
    }
}




// Function to update a category
async function updateCategory(row) {
    const id = parseInt(row.querySelector(".id-field").value);
    const category = row.querySelector(".name-field").value;

    if (!category) {
        alert("Please provide a Category.");
        return;
    }

    // Check if the new category already exists for a different ID
    const existingRecordByCategory = records.find(record => record.name === category && record.id !== id);
    if (existingRecordByCategory) {
        alert("Category already exists. Please use a different category.");
        return;
    }

    // Prepare the updated data
    const updatedRecord = { id, name: category };

    try {
        const response = await fetch('https://27ca-103-55-91-195.ngrok-free.app/category/updateCat', {
            method: 'PUT',  // Use the PUT method for updating
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true  // To skip ngrok browser warnings
            },
            body: JSON.stringify(updatedRecord)  // Send the updated data as JSON
        });

        // Check if the update was successful
        if (response.ok) {
            const data = await response.json();

            if (data.status === 1) {  // Assuming 1 indicates success in your API
                alert("Record successfully updated.");

                // Update the local record with the new data
                const recordIndex = records.findIndex(record => record.id === id);
                if (recordIndex !== -1) {
                    records[recordIndex] = updatedRecord;  // Update the record in the local array
                }

                displayData({ data: records });  // Re-display updated data
            } else {
                alert(`Failed to update the record: ${data.message}`);
            }
        } else {
            // Handle server error responses
            const errorData = await response.json();  // Try to get the error message from the response
            alert(`Failed to update the record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        // Handle network or unexpected errors
        console.error("An error occurred while updating the record:", error);
        alert("Failed to update the record. Please try again.");
    }
}



/*async function updateCategory(row) {
    const id = parseInt(row.querySelector(".id-field").value);
    const category = row.querySelector(".name-field").value;

    if (!category) {
        alert("Please provide a Category.");
        return;
    }

    // Check if the new category already exists for a different ID
    const existingRecordByCategory = records.find(record => record.name === category && record.id !== id);
    if (existingRecordByCategory) {
        alert("Category already exists. Please use a different category.");
        return;
    }

    // Prepare the updated data
    const updatedRecord = { id, name: category };

    try {
        const response = await fetch(`https://66d6dda7006bfbe2e64ee40a.mockapi.io/firstAPI/category/${id}`, {
            method: 'PUT',  // Use the PUT method for updating
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRecord)  // Send the updated data
        });

        // Check if the update was successful
        if (response.ok) {
            alert("Record successfully updated.");

            // Update the local record with the new data
            const recordIndex = records.findIndex(record => record.id === id);
            if (recordIndex !== -1) {
                records[recordIndex] = updatedRecord;  // Update the record in the local array
            }

            displayData(records);
        } else {
            // Handle server error responses
            const errorData = await response.json();  // Try to get the error message from the response
            alert(`Failed to update the record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        // Handle network or unexpected errors
        console.error("An error occurred:", error);
        alert("Failed to update the record. Please try again.");
    }
}*/


async function getDataById() {
    const id = document.getElementById("id").value;

    if (!id) {
        alert("Please provide an ID.");
        return;
    }

    try {
        let response = await fetch(`https://27ca-103-55-91-195.ngrok-free.app/category/${id}`, {
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

        // Ensure `data.data` exists and has the record in it
        if (data.status === 1 && data.data) {
            displayData({ data: [data.data] });  // Display the single fetched data as an array
        } else {
            alert("No record found for the provided ID.");
            displayData({ data: [] });  // Clear the display if no data found
        }
    } catch (error) {
        console.error("Error fetching data by ID:", error);
        alert("Failed to fetch data from the API.");
    }
}





// Function to get all data
async function getAllData() {
    try {
        let response = await fetch('https://27ca-103-55-91-195.ngrok-free.app/category/get_all?pageNo=0',{
		            method: 'GET',
		            headers: {
		                'Content-Type': 'application/json',
						'ngrok-skip-browser-warning':true
		            }     
		        });;
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

		console.log(response);
        let data = await response.json();
        console.log("Get All Data -> Display Data",data);
		
		displayData(data);
    } catch (error) {
        
        console.error('There was a problem with the fetch operation:', error);
    }
}



// Function to display data in a table with edit and delete actions
function displayData(data) {
	console.log("Display Data", data);
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
            <th class="p-2 border-r border-gray-300 text-center">CATEGORY</th>
            <th class="p-2 border-gray-300 text-center">ACTION</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.data.forEach(record => {
        const row = document.createElement("tr");
        row.className = "border-b border-gray-300";  // Apply border to row

        row.innerHTML = `
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="text" class="id-field w-full p-1 border-none text-center focus:ring-0" value="${record.id}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="text" class="name-field w-full p-1 border-none text-center focus:ring-0" value="${record.name}" readonly>
            </td>
            <td class="p-2 text-center border-gray-300">
                <button class="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                        onclick="toggleEdit(this)">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                        onclick="deleteRecord(${record.id})">
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

    if (button.querySelector("i").classList.contains("fa-edit")) {
        // Switch to edit mode
        idField.removeAttribute("readonly");
        nameField.removeAttribute("readonly");
        button.querySelector("i").classList.remove("fa-edit");
        button.querySelector("i").classList.add("fa-save");
        button.classList.remove("bg-yellow-500");
        button.classList.add("bg-blue-500");
        button.classList.add("hover:bg-blue-600");
        button.setAttribute("onclick", "saveRecord(this)");
    } else {
        // Save the record
        updateCategory(row);
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
    }
}

// Function to save the record
function saveRecord(button) {
    toggleEdit(button);
}

// Function to delete a record
async function deleteRecord(id) {
    try {
        // Send a DELETE request to the API
        const response = await fetch(`https://27ca-103-55-91-195.ngrok-free.app/category/deleteCat/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        });

        console.log(response);

        // Check if the deletion was successful
        if (response.ok) {
            // Parse the response data if needed
            const data = await response.json();

            // Check the status of the response
            if (data.status === 1) {  // Assuming 1 indicates success
                alert("Record successfully deleted.");
                
                // Filter out the deleted record from the local `records` array
                records = records.filter(record => record.id !== id);
                
                // Re-display the updated records
                displayData({ data: records });
            } else {
                alert(`Failed to delete the record: ${data.message}`);
            }
        } else {
            // Handle server error responses
            const errorData = await response.json();
            alert(`Failed to delete the record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        // Handle network or unexpected errors
        console.error("An error occurred while deleting the record:", error);
        alert("Failed to delete the record. Please try again.");
    }
}




// Bind click events to buttons
document.getElementById("submitBtn1").addEventListener("click", getDataById);
document.getElementById("submitBtn2").addEventListener("click", getAllData);
