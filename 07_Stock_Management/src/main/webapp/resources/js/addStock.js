// Call the functions to fetch categories and suppliers
fetchCategoryData();
fetchSupplierData();

// Function to add a new stock record
async function addStockApi(requestBody){
	return await fetch(`${API_BASE_URL}/stock/createStock`, {
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json',
	        'ngrok-skip-browser-warning': true // Skip ngrok browser warning
	    },
	    body: JSON.stringify(requestBody)
	});
}



async function addStock() {
    // console.log("Control Reaches addStock Function");

    
    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value.trim();
    const quantity = document.getElementById("quantity").value.trim();
    const description = document.getElementById("description").value.trim();
    const categoryDropdown = document.getElementById("category_name");
    const category_id = categoryDropdown.value;
    const category_name = categoryDropdown.options[categoryDropdown.selectedIndex].text;
    const supplierDropdown = document.getElementById("supplier_name");
    const supplier_id = supplierDropdown.value;
    const supplier_name = supplierDropdown.options[supplierDropdown.selectedIndex].text;
    const supplier_contactInfo = supplierDropdown.options[supplierDropdown.selectedIndex].getAttribute("supplierContactInfo");
	
	// Validation for each field
	if (!name || typeof name !== 'string') {
	    alert("Please provide a valid name (string).");
	    return;
	}

	if (!price || isNaN(price)) {
	    alert("Please provide a valid price (number).");
	    return;
	}

	if (!quantity || isNaN(quantity)) {
	    alert("Please provide a valid quantity (number).");
	    return;
	}

	if (!description || typeof description !== 'string') {
	    alert("Please provide a valid description (string).");
	    return;
	}

	if (!category_id || isNaN(category_id)) {
	    alert("Please provide a valid category ID (number).");
	    return;
	}

	if (!category_name || typeof category_name !== 'string') {
	    alert("Please provide a valid category name (string).");
	    return;
	}

	if (!supplier_id || isNaN(supplier_id)) {
	    alert("Please provide a valid supplier ID (number).");
	    return;
	}

	if (!supplier_name || typeof supplier_name !== 'string') {
	    alert("Please provide a valid supplier name (string).");
	    return;
	}

	if (!supplier_contactInfo || typeof supplier_contactInfo !== 'string') {
	    alert("Please provide a valid supplier contact info (string).");
	    return;
	}

    try {
        
        const requestBody = {
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            category: {
                id: category_id,
                name: category_name
            },
            supplier: {
                id: supplier_id,
                name: supplier_name,
                contactInfo: supplier_contactInfo 
            }
        };

        console.log("New Details to be Updated are going to backend", requestBody); 

        const response = await addStockApi(requestBody);
		if (!response.ok) throw new Error('Failed to delete supplier record');
		
        const responseData = await response.json().catch(() => ({}));
		console.log("Add Stock Response->JSON Data", responseData);

		response.ok && responseData.status === 1 ? alert(responseData.message) : null;
/*		if (!response.ok || data.status !== 1) return;
		alert(data.message);*/

    } catch (error) {
        console.error("Error:", error);
        alert("Failed to register the record. Please try again.");
    }
}






async function fetchCategoryDataApi() {
    return await fetch(`${API_BASE_URL}/category/get_all?pageNo=0`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
        }
    });
}



// Function to fetch categories and populate the category dropdown
async function fetchCategoryData() {
    try {
        const response = await fetchCategoryDataApi();

        if (!response.ok) throw new Error(`Network response was not ok. Status: ${response.status}`);

        const data = await response.json();
        console.log("Category JSON Data:", data);

        let categoryDropdown = document.getElementById("category_name");
        if (categoryDropdown) {
            categoryDropdown.innerHTML = '';

            data.data.forEach(category => {
                let option = document.createElement("option");
                option.value = category.id;
                option.text = category.name;
                categoryDropdown.appendChild(option);
            });
        } else {
            console.error('Dropdown element not found.');
        }

    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}






async function fetchSupplierDataApi(){
	return await fetch(`${API_BASE_URL}/supplier/getallSupplier?pageNo=0`, {
	            method: 'GET',
	            headers: {
	                'Content-Type': 'application/json',
	                'ngrok-skip-browser-warning': true
	            }
	        });
}


// Function to fetch suppliers and populate the supplier dropdown
async function fetchSupplierData() {
    try {
        const response = await fetchSupplierDataApi();

        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log("Supplier JSON Data", data);

        let supplierDropdown = document.getElementById("supplier_name");
        supplierDropdown.innerHTML = '';

        data.data.forEach(supplier => {
            let option = document.createElement("option");
            option.value = supplier.id;
            option.text = supplier.name;
            option.setAttribute("supplierContactInfo", supplier.contactInfo); 
            supplierDropdown.appendChild(option);
        });

    } catch (error) {
        console.error('Error fetching suppliers:', error);
    }
}
