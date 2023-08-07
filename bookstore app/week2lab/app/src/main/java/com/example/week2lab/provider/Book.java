package com.example.week2lab.provider;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "books")
public class Book {

    @PrimaryKey(autoGenerate = true)
    @NonNull
    @ColumnInfo(name = "itemID")
    private int bookID;
    @ColumnInfo(name = "bookTitle")
    private String bookTitle;
    @ColumnInfo(name = "bookISBN")
    private String bookISBN;
    @ColumnInfo(name = "bookDesc")
    private String bookDesc;
    @ColumnInfo(name = "bookAuthor")
    private String bookAuthor;
    @ColumnInfo(name = "bookPrice")
    private int bookPrice;

    public Book(String bookTitle, String bookISBN, String bookDesc, String bookAuthor, int bookPrice) {
        this.bookTitle = bookTitle;
        this.bookISBN = bookISBN;
        this.bookDesc = bookDesc;
        this.bookAuthor = bookAuthor;
        this.bookPrice = bookPrice;

    }
    public int getBookID() {

        return bookID;
    }

    public void setBookID(int bookID) {

        this.bookID = bookID;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getBookISBN() {
        return bookISBN;
    }

    public void setBookISBN(String bookISBN) {
        this.bookISBN = bookISBN;
    }

    public String getBookDesc() {
        return bookDesc;
    }

    public void setBookDesc(String bookDesc) {
        this.bookDesc = bookDesc;
    }

    public String getBookAuthor() {
        return bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }

    public int getBookPrice() {
        return bookPrice;
    }

    public void setBookPrice(int bookPrice) {
        this.bookPrice = bookPrice;
    }
}

