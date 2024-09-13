<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Tailwind CSS -->
    <script
        src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries"></script>
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
    <div class="flex h-screen" style="background-color: rgb(42, 63, 84);">
        <div class="w-1/6 h-full">Sidebar  </div>
        <div class="w-5/6 h-screen bg-gray-400" style="background-color: rgb(247, 247, 247);">

            <!-- Navbar -->
            <div class="flex items-center bg-[rgb(237,237,237)] text-gray-800 p-4">
                <!-- Left side with menu icon -->
                <div class="flex items-center space-x-4">
                    <i class="fas fa-bars text-xl"></i>
                    <span class="text-xl font-semibold">Menu</span>
                </div>

                <!-- Centered title -->
                <div class="flex-1 text-center">
                    <span class="text-[22px] font-semibold">Navbar</span>
                </div>

                <!-- Right side with key and shutdown icons -->
                <div class="flex items-center space-x-4">
                    <i class="fas fa-key text-xl"></i>
                    <i class="fas fa-power-off text-xl"></i>
                </div>
            </div>

            <!-- Form -->
            <div class="w-full max-w-4xl mx-auto my-2 bg-[rgb(254,254,254)] text-gray-800 p-4 border border-gray-300">
                <h3 class="text-xl mb-4"><strong>Dashboard</strong></h3>
                <hr class="mb-4 border-gray-200">
                <div class="flex flex-col gap-4">
                    <!-- Search Input Field -->
                    <div class="flex items-center mb-4">
                        <label class="w-full md:w-1/4 text-left font-medium text-gray-700 required"
                            for="id">Id</label>
                        <input type="text" id="id" class="form-input flex-1 p-2 text-sm border border-gray-300"
                            placeholder="Enter Id">
                    </div>
                </div>
                <div class="container-fluid text-center p-4">
                    <div class="flex justify-center space-x-4">
                        <button type="button"
                            class="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            id="searchStockByIdBtn">
                            Search
                        </button>
                        <button type="button"
                            class="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            id="viewAllStocksBtn">
                            View All Records
                        </button>
						<a href="/addStock" 
   							class="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
   							Add Stock
						</a>
                    </div>
                </div>

                <!-- Output Area -->
                <div id="output" class="text-center mt-4"></div>
            </div>
        </div>
    </div>

    <!-- Link to external JavaScript file -->
    <script src="../../resources/js/stock.js"></script>
    <script src="../../resources/js/getStock.js"></script>
    
</body>

</html>
