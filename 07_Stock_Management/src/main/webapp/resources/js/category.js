const API_BASE_URL = 'https://0d9f-103-55-91-195.ngrok-free.app';


async function addCategoryApi(category){
	return await fetch(`${API_BASE_URL}/category/createCategory`, {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json',
	                'ngrok-skip-browser-warning': true  
	            },
	            body: JSON.stringify({ name: category }) 
	        });
}


async function AddCategory() {
    const category = document.getElementById("category").value;

    if (!category) {
        alert("Please provide a Category.");
        return;
    }
    try {
		const response = await addCategoryApi(category);

        if (!response.ok) {
            throw new Error('Failed to add category');
        }

        const data = await response.json();
		console.log("Add Category Response->JSON Data", data);

        if (data.status === 1) {
            alert(`${data.message}`);
            document.getElementById("category").value = '';
        } else {
            alert(`Failed to register the record: ${data.message}`);
        }
		
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to register the record. Please try again.");
    }
}







async function deleteCategorybyIdApi(id){
	return await fetch(`${API_BASE_URL}/category/deleteCat/${id}`, {
	            method: 'DELETE',
	            headers: {
	                'Content-Type': 'application/json',
	                'ngrok-skip-browser-warning': true
	            }
	        });
}


async function deleteRecord(id) {
    try {
        const response = await deleteCategorybyIdApi(id);
        console.log(response);

        if (response.ok) {
            const data = await response.json();
			console.log("Delete Category Response->JSON Data", data);

            if (data.status === 1) { 
                alert(`${data.message}`);
                
                records = records.filter(record => record.id !== id);
                
                displayData({ data: records });
            } else {
                alert(`Failed to delete the record: ${data.message}`);
            }
        } else {
            const errorData = await response.json();
            alert(`Failed to delete the record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred while deleting the record:", error);
        alert("Failed to delete the record. Please try again.");
    }
}





let records = []

async function updateCategory(row) {
    const id = parseInt(row.querySelector(".id-field").value);
    const category = row.querySelector(".name-field").value;

    if (!category) {
        alert("Please provide a Category.");
        return;
    }

    const existingRecordByCategory = records.find(record => record.name === category && record.id !== id);
    if (existingRecordByCategory) {
        alert("Category already exists. Please use a different category.");
        return;
    }

    const updatedRecord = { id, name: category };

    try {
        const response = await fetch(`${API_BASE_URL}/category/updateCat`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true 
            },
            body: JSON.stringify(updatedRecord) 
        });

        if (response.ok) {
            const data = await response.json();
			console.log("Update Category Response->JSON Data", data);

            if (data.status === 1) {  
                alert(`${data.message}`);

                const recordIndex = records.findIndex(record => record.id === id);
                if (recordIndex !== -1) {
                    records[recordIndex] = updatedRecord; 
                }

                displayData({ data: records }); 
            } else {
                alert(`Failed to update the record: ${data.message}`);
            }
        } else {
            const errorData = await response.json(); 
            alert(`Failed to update the record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred while updating the record:", error);
        alert("Failed to update the record. Please try again.");
    }
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







