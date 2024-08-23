package com.devtools.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devtools.dao.BookRepository;
import com.devtools.entities.Book;

@Service
public class BookService {

	@Autowired
	private BookRepository bookRepository;
//	private static List<Book> list = new ArrayList<>();
//	
//	static {
//		list.add(new Book(1,"Ja","a"));
//		list.add(new Book(2,"Jav","av"));
//		list.add(new Book(3,"Java","avc"));
//	}
//	
	
	//get all books
	public List<Book> getAllBooks(){
		List<Book> list = (List<Book>)this.bookRepository.findAll();
		return list;
	}
	
	
//	get book by id
	public Book getBookById(int id) {
		Book book = null;
//		book = list.stream().filter(e->e.getId()==id).findFirst().get();
		
		try {
//			book = list.stream()
//					.filter(e -> e.getId() == id)
//					.findFirst()
//					.orElse(null);  // Return null if not found (or handle it more gracefully)
			
			book = this.bookRepository.findById(id);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return book;
	}
	
//	adding the book
	public Book addBook(Book b) {
		Book res = bookRepository.save(b);
		return res;
	}
	
	
//	deleting the book
	public void deleteBook(int bookId) {
//		list = list.stream().filter(book->book.getId()!=bookId).collect(Collectors.toList());
		bookRepository.deleteById(bookId);
		
	}


//	update 
	public void updateBook(Book book, int bookId) {
		// TODO Auto-generated method stub
//		list.stream().map(b->{
//			if(b.getId()==bookId) {
//				b.setTitle(book.getTitle());
//				b.setAuthor(book.getAuthor());
//			}
//			return b;
//		}).collect(Collectors.toList());
		book.setId(bookId);
		bookRepository.save(book);
		
	}

}

