const API_BASE_URL = 'https://0d9f-103-55-91-195.ngrok-free.app';







// Function to fetch a single sale record by ID and display it
async function fetchSaleDataForUpdatingSale(id) {
    
    // Validate the ID
    if (isNaN(id) || id <= 0) {
        alert("Please enter a valid positive ID.");
        return;
    }

    try {
        const response = await getSaleByIdApi(id);
		if (!response.ok) throw new Error('Failed to delete supplier record');

        const record = await response.json();
        console.log("fetchSaleDataForUpdatingSale(id) Response->JSON Data", record);
        return record;
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch sales record. Please try again.");
    }
}







async function updateSalesApi(updatedSale){
	return 	await fetch(`${API_BASE_URL}/sales/updateSales`, { 
	            method: 'PUT',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify(updatedSale)
	        });
}


// Function to update a sale record
async function updateSale(row) {
    const id = parseInt(row.querySelector(".id-field").value);
    const customerName = row.querySelector(".customerName-field").value;
    const remarks = row.querySelector(".remarks-field").value;
    const price = parseFloat(row.querySelector(".price-field").value);
    const discount = parseFloat(row.querySelector(".discount-field").value);
    const address = row.querySelector(".address-field").value;
    const mobile = row.querySelector(".mobile-field").value;
    const email = row.querySelector(".email-field").value;
    const purchasedQuantity = parseInt(row.querySelector(".purchasedQuantity-field").value);
    const purchasedDate = row.querySelector(".purchaseddate-field").value; 
    const deliveryDate = row.querySelector(".deliverydate-field").value; 
    const stock = row.querySelector(".stock-field").value; 
	
	const saleData = await fetchSaleDataForUpdatingSale(id);
	console.log("Inside Update Sales Data for getting Category, stock and Supplier detail while updating Sales Data", saleData);
	
	
	const stockId = saleData.data.stock.id;
	const stockName = saleData.data.stock.name;
	const stockDescription = saleData.data.stock.description;
	const stockPrice = saleData.data.stock.price;
	const stockQuantity = saleData.data.stock.quantity;
	const categoryId = saleData.data.stock.category.id;
	const categoryName = saleData.data.stock.category.name;
	const supplierid = saleData.data.stock.supplier.id;
	const supplierName = saleData.data.stock.supplier.name;
	const supplierContactInfo = saleData.data.stock.supplier.contactInfo;
	// console.log("Stock Category Supplier Extra Data",stockId, stockName, stockDescription, stockPrice, stockQuantity, categoryId, categoryName,  supplierid,supplierName, supplierContactInfo);

    // Validate fields
    if (!customerName || isNaN(price) || isNaN(discount) || !address || !mobile || !email || isNaN(purchasedQuantity) || !purchasedDate || !deliveryDate || !stock) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    // Create the updated sale object
    const updatedSale = {
		id,
        customerName,
        remark: remarks,
        price,
        discount,
        address,
        mobile,
        email,
        purchasedQuantity,
        purchasedDate,
        deliveryDate,
        stock:{
			id: stockId,
			name: stockName,
			description: stockDescription,
			price: stockPrice,
			quantity: stockQuantity,
			category:{
				id: categoryId,
				name: categoryName
			},
			supplier:{
				id: supplierid,
				name: supplierName,
				contantInfo: supplierContactInfo
			}
		}
    };
	
	console.log("New Details to be Updated are going to backend", updatedSale); 

    try {
        const response = await updateSalesApi(updatedSale);
		if (!response.ok) throw new Error('Failed to delete supplier record');
		
		const data = await response.json();
		console.log("Update Sales Response->JSON Data", data);

        if (response.ok && data.status === 1) {
            alert(`${data.message}`);
            getAllSales();  
        } else {
            const errorData = await response.json();
            alert(`Failed to update the record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to update the record. Please try again.");
    }
}






async function deleteSaleApi(id){
	return await fetch(`${API_BASE_URL}/sales/deleteSales/${id}`, {
	            method: 'DELETE',
	            headers: {
	                'Content-Type': 'application/json',
	                'ngrok-skip-browser-warning': true
	            }
	        });
}


// Function to delete a sale record
async function deleteSale(id) {
    try {
        const response = await deleteSaleApi(id);
		if (!response.ok) throw new Error('Failed to delete supplier record');

		const data = await response.json();
		console.log("Delete Sales Response->JSON Data", data);

		if (response.ok && data.status === 1) {
            alert(`${data.message}`);
			getAllSales();
             
        } else {
            const errorData = await response.json();
            alert(`Failed to delete the record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to delete the record. Please try again.");
    }
}







// Function to toggle edit mode
function toggleEdit(button) {
    const row = button.parentElement.parentElement;
    const fields = row.querySelectorAll(
        ".quantity-field, .customerName-field, .remarks-field, .price-field, .discount-field, .address-field, .mobile-field, .email-field, .purchasedQuantity-field, .purchaseddate-field, .deliverydate-field, .stock-field"
    );

    if (button.querySelector("i").classList.contains("fa-edit")) {
        // Switch to edit mode
        fields.forEach(field => field.removeAttribute("readonly"));
        button.querySelector("i").classList.remove("fa-edit");
        button.querySelector("i").classList.add("fa-save");
        button.classList.remove("bg-yellow-500");
        button.classList.add("bg-blue-500", "hover:bg-blue-600");
        button.setAttribute("onclick", "saveSale(this)");
    } else {
        // Save the record
        updateSale(row);
        // Revert button back to edit mode
        button.querySelector("i").classList.remove("fa-save");
        button.querySelector("i").classList.add("fa-edit");
        button.classList.remove("bg-blue-500", "hover:bg-blue-600");
        button.classList.add("bg-yellow-500", "hover:bg-yellow-600");
        button.setAttribute("onclick", "toggleEdit(this)");
        // Set fields to readonly
        fields.forEach(field => field.setAttribute("readonly", true));
    }
}

// Function to save the record
function saveSale(button) {
    toggleEdit(button);
}





// Function to clear the form after submission
function clearForm() {
    document.getElementById("quantity").value = '';
    document.getElementById("customerName").value = '';
    document.getElementById("remarks").value = '';
    document.getElementById("price").value = '';
    document.getElementById("discount").value = '';
    document.getElementById("address").value = '';
    document.getElementById("mobile").value = '';
    document.getElementById("email").value = '';
    document.getElementById("purchasedQuantity").value = '';
    document.getElementById("purchasedDate").value = '';
    document.getElementById("deliveryDate").value = '';
    document.getElementById("stockId").value = '';
    document.getElementById("stockId").removeAttribute("data-stock");
}



