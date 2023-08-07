package com.example.week2lab;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.week2lab.provider.Book;
import com.google.android.material.snackbar.Snackbar;

import java.util.ArrayList;
import java.util.List;

public class MyRecyclerViewAdapter extends RecyclerView.Adapter<MyRecyclerViewAdapter.ViewHolder> {

    List<Book> data = new ArrayList<>();

    public MyRecyclerViewAdapter() {

    }

    public void setData(List<Book> data) {
        this.data = data;
    }

    @NonNull
    @Override
    public MyRecyclerViewAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.card_view, parent, false);
        ViewHolder viewHolder = new ViewHolder(v);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull MyRecyclerViewAdapter.ViewHolder holder, int position) {
        holder.bookTitle.setText("Title: "+data.get(position).getBookTitle());
        holder.bookISBN.setText("ISBN: "+data.get(position).getBookISBN());
        holder.bookPrice.setText("Price: "+data.get(position).getBookPrice());
        holder.bookDesc.setText("Desc: "+data.get(position).getBookDesc());
        holder.bookAuthor.setText("Author: "+data.get(position).getBookAuthor());
        holder.bookID.setText("ID: "+data.get(position).getBookID()+"");



        final int fPosition = position;
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Snackbar.make(v,"Item at position "+fPosition+ " was clicked!", Snackbar.LENGTH_LONG).show();
            }
        });
    }

    @Override
    public int getItemCount() {
        return data.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder{
        public View itemView;
        public TextView bookTitle;
        public TextView bookISBN;
        public TextView bookAuthor;
        public TextView bookDesc;
        public TextView bookPrice;
        public TextView bookID;
        public TextView arrayPosition;


        public ViewHolder(View itemView){
            super(itemView);
            this.itemView = itemView;
            bookTitle= itemView.findViewById(R.id.titleCard);
            bookISBN = itemView.findViewById(R.id.isbnCard);
            bookAuthor= itemView.findViewById(R.id.authorCard);
            bookDesc = itemView.findViewById(R.id.descCard);
            bookPrice= itemView.findViewById(R.id.priceCard);
            bookID = itemView.findViewById(R.id.idCard);


        }

    }
}


