package com.example.week2lab;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.week2lab.provider.BookViewModel;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link book_list#newInstance} factory method to
 * create an instance of this fragment.
 */
public class book_list extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private BookViewModel mBookViewModel;
    RecyclerView recyclerView;
    RecyclerView.LayoutManager layoutManager;
    MyRecyclerViewAdapter adapter;
    public book_list() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment book_list.
     */
    // TODO: Rename and change types and number of parameters
    public static book_list newInstance(String param1, String param2) {
        book_list fragment = new book_list();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
        mBookViewModel = new ViewModelProvider(this).get(BookViewModel.class);
        mBookViewModel.getAllBooks().observe(this, newData -> {
            adapter.setData(newData);
            adapter.notifyDataSetChanged();
        });
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment


        View layout = inflater.inflate(R.layout.fragment_book_list, container, false);

        recyclerView =  layout.findViewById(R.id.rv);

        layoutManager = new LinearLayoutManager(getContext());  //A RecyclerView.LayoutManager implementation which provides similar functionality to ListView.
        recyclerView.setLayoutManager(layoutManager);   // Also StaggeredGridLayoutManager and GridLayoutManager or a custom Layout manager

        adapter = new MyRecyclerViewAdapter();
        recyclerView.setAdapter(adapter);

        return layout;
    }

}