package com.traffsys.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RoutesController {
	
	@GetMapping("/")
	public String categoryHome() {
		System.out.println("/categoryHome");
		return "category";
	}

	@GetMapping("/category")
	public String category() {
		System.out.println("/category");
		return "category";
	}

	@GetMapping("/addCategory")
	public String addCategory() {
		System.out.println("/addCategory");
		return "addCategory";
	}
	
	
	@GetMapping("/supplier")
	public String supplier() {
		System.out.println("/supplier");
		return "supplier";
	}

	@GetMapping("/addSupplier")
	public String addSupplier() {
		System.out.println("/addSupplier");
		return "addSupplier";
	}
	
	
	@GetMapping("/sales")
	public String sales() {
		System.out.println("/sales");
		return "sales";
	}

	@GetMapping("/addSales")
	public String addSales() {
		System.out.println("/addSales");
		return "addSales";
	}
	
	
	
	@GetMapping("/stock")
	public String stock() {
		System.out.println("/stock");
		return "stock";
	}

	@GetMapping("/addStock")
	public String addStock() {
		System.out.println("/addStock");
		return "addStock";
	}
}
