package com.jpa.first.repo;

import org.springframework.data.repository.CrudRepository;

import com.jpa.first.entities.User;

public interface UserRepository extends CrudRepository<User,Integer> {

	
}
