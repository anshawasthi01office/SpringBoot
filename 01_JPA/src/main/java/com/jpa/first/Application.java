package com.jpa.first;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.jpa.first.entities.User;
import com.jpa.first.repo.UserRepository;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
		UserRepository userRepo = context.getBean(UserRepository.class);
		
		User user = new User();
		user.setName("satyam");
		user.setCity("chandigarh");
		user.setStatus("Security Expert");
		
		User user1 = userRepo.save(user);
		
	}
	

}