const API_BASE_URL = 'https://0d9f-103-55-91-195.ngrok-free.app';


async function deleteStockApi(id){
	return await fetch(`${API_BASE_URL}/stock/delete/${id}`, { method: 'DELETE' });
}

// Function to delete a stock record
async function deleteStock(id) {
    try {
        const response = await deleteStockApi(id);
        if (!response.ok) throw new Error('Failed to delete stock record');
		
		const data = await response.json();
		console.log("Delete Stock Response->JSON Data", data);

		if (data.status === 1) {
		    alert(`${data.message}`);
			await getAllStock(); 
		} else {
		    alert(`Failed to delete the record: ${data.message}`);
		}

        
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to delete the stock record. Please try again.");
    }
}




async function getStockByIdApi(id){
	return await fetch(`${API_BASE_URL}/stock/${id}`, {
	            method: 'GET',
	            headers: {
	                'Content-Type': 'application/json',
	                'ngrok-skip-browser-warning': true
	            }
	        });
}



async function updateStockAPI(updatedRecord){
	return await fetch(`${API_BASE_URL}/stock/updateStock`, {
	           method: 'PUT',
	           headers: {
	               'Content-Type': 'application/json',
	               'ngrok-skip-browser-warning': true
	           },
	           body: JSON.stringify(updatedRecord)
	       });
}



// Function to update a stock record
async function updateStock(row) {
    console.log("Control reaches updateStock() and Printing Row", row);

    const id = parseInt(row.querySelector(".id-field").value);
	console.log("id",id);
    const name = row.querySelector(".name-field").value.trim();
    const price = parseFloat(row.querySelector(".price-field").value);
    const quantity = parseFloat(row.querySelector(".quantity-field").value);
    const description = row.querySelector(".description-field").value.trim();
	
	
	const stockData = await getStockByIdApi(id); 
	const responseData = await stockData.json();       
	console.log("Inside Update Stock Data for getting Category and Supplier detail while updating stock Data", responseData);
		
		
	const stock = responseData.data;

	const categoryId = stock.category.id;
	const categoryName = stock.category.name;

	const supplierId = stock.supplier.id;
	const supplierName = stock.supplier.name;
	const supplierContactInfo = stock.supplier.contactInfo;
	
	
    if (!name || isNaN(price) || isNaN(quantity) || !description) {
        alert("Please fill in all fields with valid data.");
        return;
    }


    const updatedRecord = { id, 
							name, 
							price, 
							quantity, 
							description,
							category: {
								id: categoryId, 
								name: categoryName
							},
							supplier: {
								id: supplierId,
								name: supplierName,
								contactinfo: supplierContactInfo
							}
						};
						
    console.log("New Details to be Updated are going to backend", updatedRecord); 

    try {
        const response = await updateStockAPI(updatedRecord);

        if (response.ok) {
            const data = await response.json();
            console.log("Update Stock Response->JSON Data", data);

            if (data.status === 1) { 
                alert(`${data.message}`);
                await getAllStock(); 
            } else {
                alert(`Failed to update the stock record: ${data.message}`);
            }
        } else {
            
            const errorData = await response.text();  
            alert(`Failed to update the stock record: ${errorData || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred while updating the stock record:", error);
        alert("Failed to update the stock record. Please try again.");
    }
}




// Function to toggle edit mode
function toggleEdit(button) {
    const row = button.parentElement.parentElement;
    const fields = row.querySelectorAll(".id-field, .name-field, .price-field, .quantity-field, .description-field");

    if (button.querySelector("i").classList.contains("fa-edit")) {
        // Switch to edit mode
        fields.forEach(field => field.removeAttribute("readonly"));
        button.querySelector("i").classList.remove("fa-edit");
        button.querySelector("i").classList.add("fa-save");
        button.classList.remove("bg-yellow-500");
        button.classList.add("bg-blue-500");
        button.classList.add("hover:bg-blue-600");
        button.setAttribute("onclick", "saveStock(this)");
    } else {
        // Save the record
        updateStock(row);
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
function saveStock(button) {
    toggleEdit(button);
}



// Function to clear form fields
function clearForm() {
    document.getElementById("name").value = '';
    document.getElementById("quantity").value = '';
    document.getElementById("description").value = '';
    document.getElementById("price").value = '';
}















