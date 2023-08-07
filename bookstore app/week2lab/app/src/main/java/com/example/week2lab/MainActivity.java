package com.example.week2lab;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.GestureDetector;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.ScaleGestureDetector;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.lifecycle.ViewModelProvider;
import androidx.room.Room;

import com.example.week2lab.provider.Book;
import com.example.week2lab.provider.BookDao;
import com.example.week2lab.provider.BookDatabase;
import com.example.week2lab.provider.BookViewModel;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.navigation.NavigationView;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.ktx.Firebase;

import java.util.Locale;
import java.util.StringTokenizer;

public class MainActivity extends AppCompatActivity {


    EditText bookTitle;
    EditText bookPrice;
    EditText bookDesc;
    EditText bookID;
    EditText bookAuthor;
    EditText bookISBN;
    DrawerLayout drawerLayout;


    DatabaseReference myRef;

    int x_down;
    int y_down;
    private BookViewModel mBookViewModel;

    GestureDetector gestureDetector;
    ScaleGestureDetector scaleGestureDetector;
    int price;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.drawer);

        price = 0;
        View fLayout = findViewById(R.id.motionLayout);
        bookTitle = findViewById(R.id.bookTitle);
        bookPrice = findViewById(R.id.bookPrice);
        bookDesc = findViewById(R.id.bookDescription);
        bookID = findViewById(R.id.bookName);
        bookAuthor = findViewById(R.id.bookAuthor);
        bookISBN = findViewById(R.id.bookISBN);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        drawerLayout = findViewById(R.id.drawerLayout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar,
                R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = findViewById(R.id.navigationView);
        navigationView.setNavigationItemSelectedListener(new MyNavigationListener());

        FloatingActionButton fab = findViewById(R.id.floatingActionButton);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                addItem();
            }
        });

        IntentFilter intentFilter = new IntentFilter("mySMS");

        ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.SEND_SMS,
                android.Manifest.permission.RECEIVE_SMS, Manifest.permission.READ_SMS}, 0);

        MyBroadCastReceiver myReceiver = new MyBroadCastReceiver();
        registerReceiver(myReceiver, new IntentFilter(SMSReceiver.SMS_FILTER));

        mBookViewModel = new ViewModelProvider(this).get(BookViewModel.class);
        mBookViewModel.getAllBooks().observe(this, newData -> {

        });
        getSupportFragmentManager().beginTransaction().add(R.id.frame_layout1,new book_list()).commit();

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        myRef = database.getReference("Book/Messege");

        gestureDetector = new GestureDetector(this, new myGestureDetector());
        scaleGestureDetector = new ScaleGestureDetector(this, new myScaleGestureDetector());

        fLayout.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {

                gestureDetector.onTouchEvent(event);
                return true;
            }
        });

    }
    public void showList()
    {
        Intent i = new Intent(this, Main2Activity.class);
        startActivity(i);
    }

    public void deleteABook(){

        mBookViewModel.deleteUnknownAuthor();

    }

    public void deleteAll(){
        mBookViewModel.deleteAll();
        myRef.removeValue();
    }

    public void addItem(){

        Book book = new Book(bookTitle.getText().toString(),bookISBN.getText().toString(),
                bookDesc.getText().toString(),bookAuthor.getText().toString(),Integer.parseInt(bookPrice.getText().toString()));
        mBookViewModel.insert(book);
        myRef.push().setValue(book);
        Toast.makeText(getApplicationContext(),"book added",Toast.LENGTH_SHORT).show();


    }


    class MyBroadCastReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {

            String msg = intent.getStringExtra(SMSReceiver.SMS_MSG_KEY);

            StringTokenizer sT = new StringTokenizer(msg, "|");
            String bookIDToken = sT.nextToken();
            String bookTitleToken = sT.nextToken();
            String bookISBNToken = sT.nextToken();
            String bookAuthorToken = sT.nextToken();
            String bookDescToken = sT.nextToken();
            String bookPriceToken = sT.nextToken();

            bookID.setText(bookIDToken);
            bookTitle.setText(bookTitleToken);
            bookISBN.setText(bookISBNToken);
            bookAuthor.setText(bookAuthorToken);
            bookDesc.setText(bookDescToken);
            bookPrice.setText(bookPriceToken);
        }
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.i("lab3","onStart");

        SharedPreferences mySP = getSharedPreferences("f1",0);

        bookTitle.setText(mySP.getString("BookTitle",""));
        bookAuthor.setText(mySP.getString("BookAuthor",""));
        bookDesc.setText(mySP.getString("BookDesc",""));
        bookID.setText(mySP.getString("BookID",""));
        bookISBN.setText(mySP.getString("BookISBN",""));
        bookPrice.setText(String.valueOf(mySP.getInt("BookPrice",0)));

    }
    @Override
    protected void onResume() {
        super.onResume();
        Log.i("lab3","onResume");
    }
    @Override
    protected void onPause() {
        super.onPause();
        Log.i("lab3","onPause");
    }
    @Override
    protected void onStop() {
        super.onStop();
        Log.i("lab3","onStop");

        SharedPreferences mySP = getSharedPreferences("f1",0);
        SharedPreferences.Editor myEditor = mySP.edit();

        myEditor.putString("BookID",bookID.getText().toString());
        myEditor.putInt("BookPrice",Integer.parseInt(bookPrice.getText().toString()));
        myEditor.putString("BookTitle",bookTitle.getText().toString());
        myEditor.putString("BookISBN",bookISBN.getText().toString());
        myEditor.putString("BookDesc",bookDesc.getText().toString());
        myEditor.putString("BookAuthor",bookAuthor.getText().toString());
        myEditor.commit();
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.i("lab3","onDestroy");
    }
    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        Log.i("lab3","onSaveInstanceState");
    }

    @Override
    protected void onRestoreInstanceState(@NonNull Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        Log.i("lab3","onRestoreInstanceState");
    }
    public void addBook(){

        SharedPreferences mySP2 = getSharedPreferences("f2",0);
        SharedPreferences.Editor myEditor2 = mySP2.edit();

        myEditor2.putString("BookIDAdded",bookID.getText().toString());
        myEditor2.putInt("BookPriceAdded",Integer.parseInt(bookPrice.getText().toString()));
        myEditor2.putString("BookTitleAdded",bookTitle.getText().toString());
        myEditor2.putString("BookISBNAdded",bookISBN.getText().toString());
        myEditor2.putString("BookDescAdded",bookDesc.getText().toString());
        myEditor2.putString("BookAuthorAdded",bookAuthor.getText().toString());
        myEditor2.commit();
    }

    public void clearText(){
        bookPrice.getText().clear();
        bookISBN.getText().clear();
        bookAuthor.getText().clear();
        bookTitle.getText().clear();
        bookDesc.getText().clear();
        bookID.getText().clear();
    }

    public void loadText(){


        SharedPreferences mySP2 = getSharedPreferences("f2",0);

        bookTitle.setText(mySP2.getString("BookTitleAdded",""));
        bookAuthor.setText(mySP2.getString("BookAuthorAdded",""));
        bookDesc.setText(mySP2.getString("BookDescAdded",""));
        bookID.setText(mySP2.getString("BookIDAdded",""));
        bookISBN.setText(mySP2.getString("BookISBNAdded",""));
        bookPrice.setText(String.valueOf(mySP2.getInt("BookPriceAdded",0)));
    }


    class MyDrawerListener implements NavigationView.OnNavigationItemSelectedListener{
        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            return true;
        }
    }

    class MyNavigationListener implements NavigationView.OnNavigationItemSelectedListener{
        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            // get the id of the selected item
            int id = item.getItemId();

            if(id == R.id.listAll){
                showList();
            }
            else if (id == R.id.delete_unknown){
                deleteABook();
            }
            else if(id == R.id.removeAll) {

                deleteAll();
                Toast.makeText(getApplicationContext(),"All Books Removed",Toast.LENGTH_SHORT).show();

            }

            // close the drawer
            drawerLayout.closeDrawers();
            // tell the OS
            return true;
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.options_menu,menu);
        return super.onCreateOptionsMenu(menu);
    }
    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.clearField) {
            clearText();
            Toast.makeText(getApplicationContext(),"item cleared",Toast.LENGTH_SHORT).show();
        }
        else if (id == R.id.loadItem) {
            loadText();
            Toast.makeText(getApplicationContext(),"item loaded",Toast.LENGTH_SHORT).show();
        }

        return super.onOptionsItemSelected(item);
    }
    class myGestureDetector extends GestureDetector.SimpleOnGestureListener{
        @Override
        public boolean onDoubleTap(@NonNull MotionEvent e) {
            Toast.makeText(getApplicationContext(),"double tapped",Toast.LENGTH_SHORT).show();
            clearText();
            return super.onDoubleTap(e);
        }

        @Override
        public boolean onSingleTapConfirmed(@NonNull MotionEvent e) {
            Toast.makeText(getApplicationContext(),"single tapped",Toast.LENGTH_SHORT).show();
            bookISBN.setText(RandomString.generateNewRandomString(8));
            return super.onSingleTapConfirmed(e);
        }

        @Override
        public boolean onScroll(@NonNull MotionEvent e1, @NonNull MotionEvent e2, float distanceX, float distanceY) {

            //distanceX = previous e2 - current e2
            if (distanceY < 0.5){
                price = price - (int)distanceX;
                bookPrice.setText(String.valueOf(price));}
            if (Math.abs(distanceX) < 0.5 && Math.abs(distanceY) > 6)
                bookTitle.setText("untitled");
            System.out.println("X: "+distanceX);
            System.out.println("Y: "+distanceY);
            return super.onScroll(e1, e2, distanceX, distanceY);
        }

        @Override
        public boolean onFling(@NonNull MotionEvent e1, @NonNull MotionEvent e2, float velocityX, float velocityY) {
            if(velocityX > 1200 || velocityY > 1200)
                moveTaskToBack(true);
            return super.onFling(e1, e2, velocityX, velocityY);
        }

        @Override
        public void onLongPress(@NonNull MotionEvent e) {
            loadText();
            super.onLongPress(e);
        }
    }

    class myScaleGestureDetector extends ScaleGestureDetector.SimpleOnScaleGestureListener{

    }



}

