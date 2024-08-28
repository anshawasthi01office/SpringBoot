package myPackage.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import myPackage.entities.User;

public interface UserRepo extends JpaRepository<User, Integer>{


}
