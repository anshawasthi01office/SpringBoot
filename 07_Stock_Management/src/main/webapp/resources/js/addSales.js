// Call the functions to fetch Stock
fetchStockData();


async function addSalesApi(newSale) {
    return await fetch(`${API_BASE_URL}/sales/createSales`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
        },
        body: JSON.stringify(newSale)
    });
}



async function addSale() {
	// console.log("control reaches addSale()");
    const customerName = document.getElementById("customerName").value;
    const remarks = document.getElementById("remarks").value;
    const price = parseFloat(document.getElementById("price").value);
    const discount = parseFloat(document.getElementById("discount").value);
    const address = document.getElementById("address").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const purchasedQuantity = parseInt(document.getElementById("purchasedQuantity").value);
    const purchasedDate = document.getElementById("purchasedDate").value;
    const deliveryDate = document.getElementById("deliveryDate").value;

	const stockDropdown = document.getElementById("stockId");
	const stock_id = stockDropdown.value;
	const stock_name = stockDropdown.options[stockDropdown.selectedIndex].text;
	const stock_quantity = stockDropdown.options[stockDropdown.selectedIndex].getAttribute("data-quantity");
	const stock_description = stockDropdown.options[stockDropdown.selectedIndex].getAttribute("data-description");
	const stock_price = stockDropdown.options[stockDropdown.selectedIndex].getAttribute("data-price");
	
	let errorMessage = (!customerName || typeof customerName !== "string" ? "Customer name must be a valid string.\n" : "") + 
	    (remarks && typeof remarks !== "string" ? "Remarks must be a valid string.\n" : "") + 
	    (isNaN(price) || price <= 0 ? "Price must be a positive number.\n" : "") + 
	    (isNaN(discount) || discount < 0 ? "Discount must be a positive number or 0.\n" : "") + 
	    (!address || typeof address !== "string" ? "Address must be a valid string.\n" : "") + 
	    (!mobile || !/^\d{10}$/.test(mobile) ? "Mobile number must be a valid 10-digit number.\n" : "") + 
	    (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Email must be in a valid email format.\n" : "") + 
	    (isNaN(purchasedQuantity) || purchasedQuantity <= 0 ? "Purchased quantity must be a positive integer.\n" : "") + 
	    (!stock_id || !stock_name ? "Please select a valid stock.\n" : "") + 
	    (!purchasedDate ? "Please provide a purchased date.\n" : "") + 
	    (!deliveryDate ? "Please provide a delivery date.\n" : "");

	if (errorMessage) { alert(errorMessage); return; }


    const newSale = {
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
        stock: {
            id: stock_id,
            name: stock_name,
            description: stock_description,
            price: stock_price,
            quantity: stock_quantity
        }
    };

	console.log("New Details to be Updated are going to backend", newSale); 
    try {
        const response = await addSalesApi(newSale);
		if (!response.ok) throw new Error('Failed to Add Sales record');
		
		const data = await response.json();
		console.log("Add Sales Response->JSON Data", data);

        if (response.ok && data.status === 1) {
            alert(`${data.message}`);
        } else {
            const errorData = await response.json();
            alert(`Failed to add the record: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to add the record. Please try again.");
    }
}






async function fetchStockApi() {
    return await fetch(`${API_BASE_URL}/stock?pageNo=0`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
        },
    });
}

async function fetchStockData() {
    // console.log("Control reached fetchStockData()");
    try {
        const response = await fetchStockApi();
        
        let data = await response.json();
		console.log("fetchStockData() Response->JSON Data", data);
        let stockDropdown = document.getElementById("stockId");
        stockDropdown.innerHTML = '';  // Clear the dropdown before populating new data

        data.data.forEach(stock => {
            let option = document.createElement("option");
            option.value = stock.id;  // Set the value to stock ID
            option.text = stock.name;  // Set the display text to stock name
            
            // Set multiple attributes for the stock data
            option.setAttribute("data-contact-info", stock.contactInfo);
            option.setAttribute("data-price", stock.price);
            option.setAttribute("data-description", stock.description);
            option.setAttribute("data-quantity", stock.quantity);
            option.setAttribute("data-name", stock.name);
            option.setAttribute("data-id", stock.id);
            
            stockDropdown.appendChild(option);  // Append the option to the dropdown
        });

    } catch (error) {
        console.error("Error fetching stock data:", error);
        alert("Error fetching stock data");
    }
}