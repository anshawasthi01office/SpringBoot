package com.devtools.dao;
import com.devtools.entities.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book,Integer>{
public Book findById(int id);
}
