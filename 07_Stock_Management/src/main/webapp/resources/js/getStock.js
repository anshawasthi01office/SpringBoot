async function getStockByIdApi(id){
	return await fetch(`${API_BASE_URL}/stock/${id}`, {
	            method: 'GET',
	            headers: {
	                'Content-Type': 'application/json',
	                'ngrok-skip-browser-warning': true
	            }
	        });
}


async function getStockById() {
    const id = parseInt(document.getElementById("id").value.trim());
    if (isNaN(id)) {
        alert("Please enter a valid ID.");
        return;
    }

	// Check if the ID is a valid number
	if (isNaN(id)) {
	    alert("ID must be a valid number.");
	    return;
	}

    try {
        const response = await getStockByIdApi(id);
        if (!response.ok) throw new Error('Failed to fetch stock record');

        const record = await response.json();
        console.log("getById Stock Response->JSON Data", record);
		
		if (record.status == 1 && record.data) {
			alert(record.message);
		    displayStock(record.data);
		}
		else {
		    alert(record.message);
		}
        
        
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch stock record. Please try again.");
    }
}




async function getAllStockApi() {
    return await fetch(`${API_BASE_URL}/stock?pageNo=0`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
        }
    });
}

async function getAllStock() {
    try {
        const response = await getAllStockApi(); 
        if (!response.ok) throw new Error('Failed to fetch stock records');

        const record = await response.json();
        console.log("getAll Stock Response->JSON Data", record);
		
		if (record.status == 1 && record.data) {
			alert(record.message);
		    displayStock(record.data);
		}
		else {
		    alert(record.message);
		}
        
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch stock records. Please try again.");
    }
}






function displayStock(data) {
    console.log("Data : displayStock()", data);

    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";  // Clear previous output

    // Ensure `data` is an array
    if (!Array.isArray(data)) {
        data = [data]; // Wrap in array if it's not an array
    }

    if (data.length === 0) {
        outputDiv.innerHTML = "<p>No records found</p>";
        return;
    }

    // Create table with full width and border
    const table = document.createElement("table");
    table.className = "w-full border border-gray-300";

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr class="bg-gray-200 border-b border-gray-300">
            <th class="p-2 border-r border-gray-300 text-center">ID</th>
            <th class="p-2 border-r border-gray-300 text-center">Quantity</th>
            <th class="p-2 border-r border-gray-300 text-center">Name</th>
            <th class="p-2 border-r border-gray-300 text-center">Description</th>
            <th class="p-2 border-r border-gray-300 text-center">Price</th>
            <th class="p-2 border-r border-gray-300 text-center">Category Name</th>
            <th class="p-2 border-r border-gray-300 text-center">Supplier Name</th>
            <th class="p-2 border-gray-300 text-center">Action</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.forEach(record => {
        const row = document.createElement("tr");
        row.className = "border-b border-gray-300";  // Apply border to row

        // Check for undefined/null and log it
        const categoryName = record.category ? record.category.name : 'N/A';
        const supplierName = record.supplier ? record.supplier.name : 'N/A';
        // console.log(`Record ID ${record.id} - Category: ${categoryName}, Supplier: ${supplierName}`);
		
        row.innerHTML = `
			<td class="p-2 border-r border-gray-300 text-center">
		    	<input type="text" class="id-field w-full p-1 border-none text-center focus:ring-0" value="${record.id}" readonly>
		    </td>
            
			<td class="p-2 border-r border-gray-300 text-center">
				<input type="text" class="quantity-field w-full p-1 border-none text-center focus:ring-0" value="${record.quantity}" readonly>
			</td>
			
			<td class="p-2 border-r border-gray-300 text-center">
				<input type="text" class="name-field w-full p-1 border-none text-center focus:ring-0" value="${record.name}" readonly>
			</td>
			
			<td class="p-2 border-r border-gray-300 text-center">
				<input type="text" class="description-field w-full p-1 border-none text-center focus:ring-0" value="${record.description}" readonly>
			</td>
			
			<td class="p-2 border-r border-gray-300 text-center">
				<input type="text" class="price-field w-full p-1 border-none text-center focus:ring-0" value="${record.price}" readonly>
			</td>

            <td class="p-2 border-r border-gray-300 text-center">${categoryName}</td>
            <td class="p-2 border-r border-gray-300 text-center">${supplierName}</td>
			
			
            <td class="p-2 text-center border-gray-300">
                <button class="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                        onclick="toggleEdit(this)">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                        onclick="deleteStock(${record.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    outputDiv.appendChild(table);
}

document.getElementById("viewAllStocksBtn").addEventListener("click", getAllStock);
document.getElementById("searchStockByIdBtn").addEventListener("click", getStockById);


