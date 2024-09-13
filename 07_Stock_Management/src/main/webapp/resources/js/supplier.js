const API_BASE_URL = 'https://0d9f-103-55-91-195.ngrok-free.app';



async function addSupplierApi(name, contact_info){
	return await fetch(`${API_BASE_URL}/supplier/createSupplier`, {
	            method: 'POST',
				    headers: {
				        'Content-Type': 'application/json',
				        'ngrok-skip-browser-warning': true  
				    },
				    body: JSON.stringify({ name, contactInfo : contact_info }) 
				});
}



async function AddSupplier() {
    const name = document.getElementById("name").value.trim();
    const contact_info = document.getElementById("contact_info").value.trim();

    if (!name || !contact_info) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    try {
        const response = await addSupplierApi(name, contact_info);
		if (!response.ok) throw new Error('Failed to add supplier record');
		
		const data = await response.json();
		console.log("Add Supplier Response->JSON Data", data);

        
		if (data.status === 1) {
		    alert(`${data.message}`);
		} else {
		    alert(`Failed to Add the record: ${data.message}`);
		}
		
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to add the supplier record. Please try again.");
    }
}




async function deleteSupplierByIdApi(id){
	return await fetch(`${API_BASE_URL}/supplier/delete/${id}`, {
	            method: 'DELETE',
	            headers: {
	                'Content-Type': 'application/json',
	                'ngrok-skip-browser-warning': true
	            }
	        });
}


async function deleteRecord(id) {
    try {
        const response = await deleteSupplierByIdApi(id);
        if (!response.ok) throw new Error('Failed to delete supplier record');

        const data = await response.json();
		console.log("Delete Supplier Response->JSON Data", data);
		
		if (data.status === 1) {
		    alert(`${data.message}`);
			await getAllSupplier(); 
		} else {
		    alert(`Failed to delete the record: ${data.message}`);
		}
		
		
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to delete the supplier record. Please try again.");
    }
}






async function updateSupplierApi(updatedRecord){
	return await fetch(`${API_BASE_URL}/supplier/updateSupplier`, {
	            method: 'PUT',
	            headers: {
	                'Content-Type': 'application/json',
	                'ngrok-skip-browser-warning': true
	            },
	            body: JSON.stringify(updatedRecord)
	        });
}


async function updateSupplier(row) {
    const id = parseInt(row.querySelector(".id-field").value);
    const name = row.querySelector(".name-field").value.trim();
    const contact_info = row.querySelector(".contact-info-field").value.trim();

    if (!name || !contact_info) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    const updatedRecord = { id, name: name, contactInfo : contact_info };
    console.log("New Details to be Updated are going to backend", updatedRecord); 

    try {
        const response = await updateSupplierApi(updatedRecord);
		if (!response.ok) throw new Error('Failed to update supplier record');

		const data = await response.json();
		console.log("Update Supplier Response->JSON Data", data);

		if (data.status === 1) {
		    alert(`${data.message}`);
			await getAllSupplier(); 
		} else {
		    alert(`Failed to update the supplier record: ${data.message}`);
		}

    } catch (error) {
        console.error("An error occurred while updating the supplier record:", error);
        alert("Failed to update the supplier record. Please try again.");
    }
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



// Function to clear form fields
function clearForm() {
    document.getElementById("name").value = '';
    document.getElementById("contact_info").value = '';
}



