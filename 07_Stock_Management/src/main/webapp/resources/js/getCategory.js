
async function getAllCategoryApi(){
	return await fetch(`${API_BASE_URL}/category/get_all?pageNo=0`, {
			            method: 'GET',
			            headers: {
			                'Content-Type': 'application/json',
							'ngrok-skip-browser-warning':true
			            }     
			        });;
}


async function getAllData() {
    try {
        let response = await getAllCategoryApi();
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let record = await response.json();
        console.log("getAll Category Response->JSON Data", record);
		
		if (record.status == 1 && record.data) {
					alert(record.message);
				    displayData(record);
				}
				else {
				    alert(record.message);
				}
		
    } catch (error) {
        
        console.error('There was a problem with the fetch operation:', error);
    }
}




async function getCategoryByIdApi(id) {
    return await fetch(`${API_BASE_URL}/category/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
        }
    });
}


async function getDataById() {
    const id = document.getElementById("id").value;

	if (!id || isNaN(id)) { alert(!id ? "Please provide an ID." : "ID must be a valid number."); return; }
	
    try {
        let response = await getCategoryByIdApi(id);
		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("getById Category Response->JSON Data", data);

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





function displayData(data) {
	console.log("Display Data", data);
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";  

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

// Bind click events to buttons
document.getElementById("submitBtn1").addEventListener("click", getDataById);
document.getElementById("submitBtn2").addEventListener("click", getAllData);