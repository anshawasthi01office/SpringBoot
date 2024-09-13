async function getSupplierByIdApi(id){
	return fetch(`${API_BASE_URL}/supplier/${id}`, {
	            method: 'GET',
	            headers: {
	                'Content-Type': 'application/json',
	                'ngrok-skip-browser-warning': true
	            }
	        });
}





async function getSupplierById() {
    const id = document.getElementById("id").value.trim();

    if (!id) {
        alert("Please provide an ID.");
        return;
    }
	
	// Check if the ID is a valid number
	if (isNaN(id)) {
	    alert("ID must be a valid number.");
	    return;
	}

    try {
        const response = await getSupplierByIdApi(id);

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const record = await response.json();
        console.log("getAll Supplier Response->JSON Data", record);

		if (record.status == 1 && record.data) {
					alert(record.message);
				    displayData([record.data]);
				}
				else {
				    alert(record.message);
				}

    } catch (error) {
        console.error("Error fetching data by ID:", error);
        alert("Failed to fetch data from the API.");
    }
}




async function getAllSupplierApi(){
	return await fetch(`${API_BASE_URL}/supplier/getallSupplier?pageNo=0`, {
	            method: 'GET',
	            headers: {
	                'Content-Type': 'application/json',
	                'ngrok-skip-browser-warning': true
	            }
	        });
}


async function getAllSupplier() {
    try {
        const response = await getAllSupplierApi();
		if (!response.ok) throw new Error('Failed to update supplier record');

        const record = await response.json();
		console.log("getAll Supplier Response->JSON Data", record);
        
		if (record.status == 1 && record.data) {
					alert(record.message);
				    displayData(record.data);
				}
				else {
				    alert(record.message);
				}
		
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch supplier records. Please try again.");
    }
}






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



document.getElementById("getById1").addEventListener("click", getSupplierById);
document.getElementById("getAllSupplier").addEventListener("click", getAllSupplier);
