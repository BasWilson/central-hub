package com.example.centralhub;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class HubActivity extends AppCompatActivity {

    Button profileButton, categoryButton, puntenshopButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hub);
        getSupportActionBar().hide();
        setup();
    }

    private void setup() {
        profileButton = (Button)findViewById(R.id.profileButton);
        categoryButton = (Button)findViewById(R.id.catogoryButton);
        puntenshopButton = (Button)findViewById(R.id.puntenShopButton);
        if (profileButton != null) {
            profileButton.setOnClickListener(this::openProfile);
        }
        if (categoryButton != null) {
            categoryButton.setOnClickListener(this::openCategories);
        }
        if (puntenshopButton != null) {
            puntenshopButton.setOnClickListener(this::openPuntenshop);
        }
    }

    private void openProfile(View v) {
        Intent intent = new Intent(HubActivity.this, ProfileActivity.class);
        startActivity(intent);
    }

    private void openCategories(View v) {
        Intent intent = new Intent(HubActivity.this, CategoriesActivity.class);
        startActivity(intent);
    }

    private void openPuntenshop(View v) {
        Intent intent = new Intent(HubActivity.this, PuntenshopActivity.class);
        startActivity(intent);
    }
}