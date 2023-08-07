package com.example.week2lab.provider;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Delete;


import java.util.List;

@Dao
public interface BookDao {

    @Query("select * from books")
    LiveData<List<Book>> getAllBooks();

    @Query("select * from books where bookTitle=:title")
    List<Book> getBook(String title);

    @Insert
    void addBook(Book book);

    @Query("delete from books where bookAuthor = 'unknown'")
    void deleteBook();

    @Query("delete FROM books")
    void deleteAllBooks();
}