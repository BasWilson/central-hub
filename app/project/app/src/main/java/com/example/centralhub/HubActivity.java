package com.example.centralhub;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class HubActivity extends AppCompatActivity {

    Button profileButton, categoryButton, puntenshopButton, article1Button, article2Button, hotspotsButton;

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
        article1Button = (Button)findViewById(R.id.newsItem1Button);
        article2Button = (Button)findViewById(R.id.newsItem2Button);
        hotspotsButton = (Button)findViewById(R.id.hotspotsButton);
        if (profileButton != null) {
            profileButton.setOnClickListener(this::openProfile);
        }
        if (categoryButton != null) {
            categoryButton.setOnClickListener(this::openCategories);
        }
        if (puntenshopButton != null) {
            puntenshopButton.setOnClickListener(this::openPuntenshop);
        }
        if (article2Button != null && article1Button != null) {
            article1Button.setOnClickListener(this::openArticle);
            article2Button.setOnClickListener(this::openArticle);
        }
        hotspotsButton.setOnClickListener(this::openHotspots);
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

    private void openArticle(View v) {
        Intent intent = new Intent(HubActivity.this, ArticleDetailActivity.class);
        startActivity(intent);
    }

    private void openHotspots(View v) {
        Intent intent = new Intent(HubActivity.this, HotspotsActivity.class);
        startActivity(intent);
    }
}