package com.example.centralhub;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class CategoriesActivity extends AppCompatActivity {

    Button logoutButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_categories);
        getSupportActionBar().hide();
        setup();
    }

    private void setup() {
        logoutButton = (Button)findViewById(R.id.logoutButton);
        if (logoutButton != null) {
            logoutButton.setOnClickListener(this::onClick);
        }
    }

    private void onClick(View v) {
        Intent intent = new Intent(CategoriesActivity.this, MainActivity.class);
        startActivity(intent);
    }
}