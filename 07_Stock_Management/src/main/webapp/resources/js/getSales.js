async function getSalesApi() {
    return await fetch(`${API_BASE_URL}/sales?pageNo=0`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true 
        },
    });
}

async function getAllSales() {
    try {
        const response = await getSalesApi();

        if (response.ok) {
            const record = await response.json();
			console.log("getAll Sales Response->JSON Data", record);
			
			
			if (record.status == 1 && record.data) {
				alert(record.message);
			    displaySales(record.data);
			}
			else {
			    alert(record.message);
			}
           
        } else {
            const errorData = await response.json();
            alert(`Failed to fetch records: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to fetch records. Please try again.");
    }
}






async function getSaleByIdApi(id) {
    return await fetch(`${API_BASE_URL}/sales/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true 
        },
    });
}


async function getSaleById() {
    const id = parseInt(document.getElementById("id").value.trim());

    if (isNaN(id) || id <= 0) {
        alert("Please enter a valid positive ID.");
        return;
    }
    try {
        const response = await getSaleByIdApi(id);
        if (!response.ok) throw new Error('Failed to get record by ID');

        const record = await response.json();
        console.log("getById Sales Response->JSON Data", record);

        if (record.status == 1 && record.data) {
			alert(record.message);
            displaySales([record.data]);
        }
        else {
            alert(record.message);
        }
        
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch sales record. Please try again.");
    }
}







function displaySales(data) {
	console.log(data);
	if(!data) return;
	console.log("Data : displaySales()", data);
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
            <th class="p-2 border-r border-gray-300 text-center">Customer Name</th>
            <th class="p-2 border-r border-gray-300 text-center">Remarks</th>
            <th class="p-2 border-r border-gray-300 text-center">Price</th>
            <th class="p-2 border-r border-gray-300 text-center">Discount</th>
            <th class="p-2 border-r border-gray-300 text-center">Address</th>
            <th class="p-2 border-r border-gray-300 text-center">Mobile</th>
            <th class="p-2 border-r border-gray-300 text-center">Email</th>
            <th class="p-2 border-r border-gray-300 text-center">Purchased Quantity</th>
			<th class="p-2 border-r border-gray-300 text-center">Purchased Date</th>
			<th class="p-2 border-r border-gray-300 text-center">Delivery Date</th>
            <th class="p-2 border-r border-gray-300 text-center">Stock Name</th>
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
                <input type="text" class="customerName-field w-full p-1 border-none text-center focus:ring-0" value="${record.customerName}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="text" class="remarks-field w-full p-1 border-none text-center focus:ring-0" value="${record.remark}" readonly>
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
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="text" class="purchaseddate-field w-full p-1 border-none text-center focus:ring-0" value="${record.purchasedDate}" readonly>
            </td>
            <td class="p-2 border-r border-gray-300 text-center">
                <input type="text" class="deliverydate-field w-full p-1 border-none text-center focus:ring-0" value="${record.deliveryDate}" readonly>
            </td>
			<td class="p-2 border-r border-gray-300 text-center">
			    <input type="text" class="stock-field w-full p-1 border-none text-center focus:ring-0" value="${record.stock.name}" readonly>
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




// Bind click events to buttons
document.getElementById("searchSaleBtn").addEventListener("click", getSaleById);
document.getElementById("viewAllSalesBtn").addEventListener("click", getAllSales);