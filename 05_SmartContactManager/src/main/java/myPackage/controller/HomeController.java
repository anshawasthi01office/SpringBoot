package myPackage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import myPackage.DAO.UserRepo;
import myPackage.entities.User;

@RestController
public class HomeController {
	
	@Autowired
	private UserRepo userRepo;
	
	@GetMapping("/test")
	public String test() {
		User user = new User();
		
		user.setName("Ansh");
		user.setEmail("ansh@gmail.com");
		userRepo.save(user);
		
		return "Working";
	}


}



