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
        <div class="w-1/6 h-full">Sidebar</div>
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
                <h3 class="text-xl mb-4"><strong>Add Sales</strong></h3>
                <hr class="mb-4 border-gray-200">
                <div class="flex flex-col gap-4">

                    <!-- First Input Field -->

                    <div class="flex items-center mb-4">
                        <label class="w-full md:w-1/4 text-left font-medium text-gray-700 required" for="id">Customer Name</label>
                        <input type="text" id="customerName" class="form-input flex-1 p-2 text-sm border border-gray-300"
                            placeholder="Enter Customer Name">
                    </div>
                    
                    <div class="flex items-center mb-4">
                        <label class="w-full md:w-1/4 text-left font-medium text-gray-700 required" for="id">Remark</label>
                        <input type="text" id="remarks" class="form-input flex-1 p-2 text-sm border border-gray-300"
                            placeholder="Enter Remark">
                    </div>



                    <div class="flex items-center mb-4">
                        <label class="w-full md:w-1/4 text-left font-medium text-gray-700 required" for="id"> Price</label>
                        <input type="text" id="price" class="form-input flex-1 p-2 text-sm border border-gray-300"
                            placeholder="Enter Price">
                    </div>
                    
                    <div class="flex items-center mb-4">
                        <label class="w-full md:w-1/4 text-left font-medium text-gray-700 required" for="id">Discount</label>
                        <input type="text" id="discount" class="form-input flex-1 p-2 text-sm border border-gray-300"
                            placeholder="Enter Discount">
                    </div>
                    

                    <div class="flex items-center mb-4">
                        <label class="w-full md:w-1/4 text-left font-medium text-gray-700 required" for="id">Address</label>
                        <input type="text" id="address" class="form-input flex-1 p-2 text-sm border border-gray-300"
                            placeholder="Enter Address">
                    </div>
                    
                    <div class="flex items-center mb-4">
                        <label class="w-full md:w-1/4 text-left font-medium text-gray-700 required" for="id">Mobile</label>
                        <input type="text" id="mobile" class="form-input flex-1 p-2 text-sm border border-gray-300"
                            placeholder="Enter Mobile">
                    </div>

                    <div class="flex items-center mb-4">
                        <label class="w-full md:w-1/4 text-left font-medium text-gray-700 required" for="id">Email</label>
                        <input type="text" id="email" class="form-input flex-1 p-2 text-sm border border-gray-300"
                            placeholder="Enter Email">
                    </div>


                    <div class="flex items-center mb-4">
                        <label class="w-full md:w-1/4 text-left font-medium text-gray-700 required" for="id">Purchased Quantity</label>
                        <input type="text" id="purchasedQuantity" class="form-input flex-1 p-2 text-sm border border-gray-300"
                            placeholder="Enter Purchased Quantity">
                    </div>

                    <div class="flex items-center mb-4">
                        <label class="w-full md:w-1/4 text-left font-medium text-gray-700 required" for="id">Purchased Date</label>
                        <input type="Date" id="purchasedDate" class="form-input flex-1 p-2 text-sm border border-gray-300"
                            placeholder="Enter Purchased Date">
                    </div>
                    
                    
                    <div class="flex items-center mb-4">
                        <label class="w-full md:w-1/4 text-left font-medium text-gray-700 required" for="id">Delivery Date</label>
                        <input type="Date" id="deliveryDate" class="form-input flex-1 p-2 text-sm border border-gray-300"
                            placeholder="Enter Delivery Date">
                    </div>
                    
					
					<div class="flex items-center mb-4">
    					<label class="w-full md:w-1/4 text-left font-medium text-gray-700 required" for="supplier_id">Stock Name</label>
    					<select id="stockId" class="form-input flex-1 p-2 text-sm border border-gray-300">
        					<option value="">Select Stock</option>
    					</select>
                	</div>
                	
                	
                <div class="container-fluid text-center p-4">
                    <div class="flex justify-center space-x-4">
                        <button type="button" onclick="addSale()"
                            class="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            id="submitBtn1">
                            Add
                        </button>

                        <a href="/sales"
                            class="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            View Sales
                        </a>
                    </div>
                </div>

            </div>

        </div>
    </div>

    <!-- Link to external JavaScript file -->
    <script src="../../resources/js/sales.js"></script>
    <script src="../../resources/js/addSales.js"></script>
</body>

</html>